"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {useState, useEffect,useRef} from "react"
import Link from "next/link"
import { convertToQuestionAnswersFormat } from "@/lib/utils"
import axios from "axios"
import { db } from "@/lib/db"
import { MockEval } from "@/lib/schema"
import { eq } from "drizzle-orm"


export default function Page({ params }) {  
    const mockID = params.mockID;
    return (
      <div className="grid h-screen w-full">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Mock Call</h1>
            <Button
              variant="destructive"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              End Session
            </Button>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4">
            <div className="relative flex gap-2 items-center justify-center h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Whisper + AI71 Powered
              </Badge>
              <CallCard mockID={mockID} />
              <Alert className="w-[300px] p-7">
                <AlertDescription>
                  <ul className="list-disc">
                    <li>Click Speak Button to Talk back to AI voice bot.</li>
                    <li>Click intrrupt to stop sentence that AI speeking.</li>
                    <li>Don't refresh between session.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </main>
        </div>
      </div>
    )
}


function CallCard({mockID}) {
  const [mockEvalObj, setMockEvalObj] = useState(null);

  const [recording, setRecording] = useState(false);
  const [botSpeaking, setBotSpeaking]  = useState(false);
  const [thinking, setThinking]  = useState(false);

  const [shownText, setShownText]  = useState("Start interview now...");
  const [conversation, setConversation] = useState([{ role: 'assistant', content: "Hello, thank you for joining this interview. I will be conducting this interview for the position. To start, could you please introduce yourself?" }]);
  
  const [botAudio, setBotAudio] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  
  const mediaRecorderRef = useRef(null);

  const initializeInterview =async () => {
    try{
      const ttsResponse = await fetch('/api/get-initial-audio');
      const ttsData = await ttsResponse.json();
      const audio = new Audio(ttsData.base64audio);
      audio.play();
      
  
      setInterviewStarted(true);
      setBotSpeaking(true);
      audio.onended = ()=>{setBotSpeaking(false)};
      
      localStorage.setItem('conversation', JSON.stringify(conversation));
      const mockEval = await db.select().from(MockEval).where(eq(MockEval.mockID,mockID)).limit(1).execute();
      setMockEvalObj(mockEval[0]);
    }catch(e){
      console.log("Error in Initializing Interview", e);
    }
  }
  const handleInterviewEnd =async ()=>{
    setShownText("Generating Results...");
    setBotSpeaking(false);
    setRecording(false);
    setThinking(false);
    setBotAudio(null);

    try {
      const localStorage_conversation = localStorage.getItem('conversation');
      console.log(localStorage_conversation);
      const questions_answers = convertToQuestionAnswersFormat(JSON.parse(localStorage_conversation))
      console.log(questions_answers);

      let data_for_api = {question_answers:JSON.stringify(questions_answers)}
      if(mockEvalObj===null){
        const mockEval = await db.select().from(MockEval).where(eq(MockEval.mockID,mockID)).limit(1).execute();
        data_for_api = {
          ...data_for_api,
          evaluation_title : mockEval[0].mockTitle,
          evaluation_type: mockEval[0].mockType,
          user_details: mockEval[0].mockDesc,
        }
      }else{
        data_for_api = {
          ...data_for_api,
          evaluation_title : mockEvalObj.mockTitle,
          evaluation_type: mockEvalObj.mockType,
          user_details: mockEvalObj.mockDesc,
        }
      }

      let response =await axios.post(`/api/chat-evaluation-metrics`,data_for_api);
      
      let results = JSON.parse(response.data);
      console.log(results);

      await db.update(MockEval).set({ mockAIQuestions: JSON.stringify(questions_answers), mockAIMetrics: JSON.stringify(results.metrics) , mockAIRecommentdations:results.recommendations }).where(eq(MockEval.mockID, mockID));
      setShownText("Interview Ended, Result shown in dashboard, End Session to Check Results");
    } catch (error) {
      console.log("Error in generating metrics",error);
      setShownText("Interview Ended");
    }
    setInterviewEnded(true);
    mediaRecorderRef.current.stop()
    localStorage.removeItem('conversation');
  }

  const handleRecord = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      setRecording(false);
      const blob = new Blob(chunks, { type: 'audio/wav' });
      handleFalconResponse(blob);     
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 20000);
  };


  const STT =async (blob)=>{
    const formData = new FormData();
    formData.append('audio', blob);

    const response = await fetch('/api/stt', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.text;
  }
  const TTS = async (text)=>{
    const ttsResponse = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    });

    const ttsData = await ttsResponse.json();
    return ttsData.base64audio;
  }

  const falconCall = async (prev_conversation) => {
    const response = await fetch('/api/falcon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mockID,conversation: prev_conversation }),
    });

    const data = await response.json();
    return data.text;
  }

  const handleFalconResponse = async (blob) => {
    setThinking(true);
    
    const userInput =await STT(blob);
    
    const updatedConversation = [...conversation, { role: 'user', content: userInput }];
    
    const generated_text= await falconCall(updatedConversation)
    
    updatedConversation.push({ role: 'assistant', content: generated_text });
    setConversation(updatedConversation);
    localStorage.setItem('conversation', JSON.stringify(updatedConversation));
    
    const generated_audio = await TTS(generated_text);
    
    setBotAudio(generated_audio);
    setThinking(false);
  };

  
  
  const handleSpeak= ()=>{
    setBotSpeaking(false)
    setBotAudio(null)
    handleRecord();
  }
  const handleStopSpeaking= ()=>{
      mediaRecorderRef.current.stop();
  }

  const handleIntruppt= ()=>{
    setBotSpeaking(false)
    setBotAudio(null)    
  }


  useEffect(()=>{
    if(recording)setShownText("Recording....")
    else if(botSpeaking)setShownText("Ai bot Speaking....")
    else if(thinking)setShownText("Thinking....")
    else setShownText("...")
  }, [recording,botSpeaking,thinking])

  useEffect(() => {
    if (botAudio) {
      const audio = new Audio(botAudio);
      audio.play();
      setBotSpeaking(true);
      audio.onended = ()=>{setBotSpeaking(false);setBotAudio(null);};
    }
  }, [botAudio])

  return (
    <Card className="w-[300px]">
    <CardHeader>
        <CardTitle>{mockEvalObj?.mockTitle ?? "Voice Evaluation"}</CardTitle>
        <CardDescription className="text-xs truncate">ID: {mockID}</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-center flex-col items-center gap-4">
      <TimerCountdown  limitInMinutes={10} handleInterviewEnd={handleInterviewEnd} interviewStarted={interviewStarted} />
      <Avatar className="w-48 h-48">
        <AvatarImage src="https://github.com/shadcn.png" alt="voice ai" />
        <AvatarFallback>Voice AI</AvatarFallback>
      </Avatar>
      <div>{shownText}</div>
    </CardContent>
    <CardFooter className="flex gap-3">
      {interviewEnded && 
        <Link href={`/dashboard/results/${mockID}`}>
          <Button className="flex-1">Go to Results</Button>
        </Link>
      }
      {interviewStarted && !interviewEnded && (<>
        <Button onClick={recording ? handleStopSpeaking:handleSpeak} disabled={botSpeaking || thinking} vairant={recording ?"destructive":"primary"} className="flex-1">{recording ? "Stop Recording":"Speak to AI"}</Button>
        <Button onClick={handleIntruppt} disabled={!botSpeaking || thinking} variant="secondary" className="flex-1">Intruppt</Button>
      </>
      )}
      {!interviewStarted && !interviewEnded && (
        <Button onClick={initializeInterview} disabled={interviewStarted} className="flex-1">Start Interview Now</Button>
      )}
    </CardFooter>
</Card>
  )
}


function TimerCountdown({limitInMinutes , handleInterviewEnd, interviewStarted}){  
    const [countdown, setCountdown] = useState(0);


    useEffect(() => {
      if(interviewStarted){
        const storedTime = localStorage.getItem('countdownStartTime');
        const startTime = storedTime ? parseInt(storedTime) : Date.now();
        localStorage.setItem('countdownStartTime', startTime.toString());
  
        const intervalId = setInterval(() => {
          const elapsedTime = (Date.now() - startTime) / 1000;
          const remainingTime = Math.max((60 * limitInMinutes) - elapsedTime, 0);
          setCountdown(remainingTime);

          if (remainingTime === 0) {
            clearInterval(intervalId);
            localStorage.removeItem('countdownStartTime');
            handleInterviewEnd();
          }
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }, [interviewStarted]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return (
      <div>
        {minutes}:{seconds < 10 ? `0${Math.trunc(seconds)}` : Math.trunc(seconds)}
      </div>
    );
}




