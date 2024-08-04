"use client"
import {
    CornerDownLeft,
    RocketIcon,
    Terminal,TrendingUp
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import {
    TooltipProvider,
  } from "@/components/ui/tooltip"
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
  import axios from "axios"
  import { MockEval } from "@/lib/schema"
import { db } from "@/lib/db"
import { useState,useEffect,useRef } from "react"
import {
      Alert,
      AlertDescription,
      AlertTitle,
} from "@/components/ui/alert"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page({ params }) {
  const [mockOBJ, setMockOBJ] = useState(null)
  const [questions, setQuestions] = useState(null)
    const [answer, setAnswer] = useState("")
    const [finished, setFinished] = useState(false)
    const [currentQuestionID, setCurrentQuestionID] = useState(0)
    const [conversation, setConversation] = useState([<Instructions key={"instruction"} />])
    const mockID = params.mockID;

    const fetchQuestion =async ()=>{
      try{
        const mockEval = await db.select().from(MockEval).where(eq(MockEval.mockID,mockID)).limit(1).execute();
        let q = JSON.parse(mockEval[0].mockAIQuestions)
        setMockOBJ(mockEval[0])
        if(q){
          setQuestions(q)
          setConversation(p=>[...p,<QuestionBubble key={`0-question`} markText={q[0].question} />])
        }
      }catch(e){
        console.log("Error in fetching chat data from server", e)
      }
    }

    useEffect(() => {
      if(!questions)
        fetchQuestion()
    }, [])
    
    const handleFinish = ()=>{
      setFinished(true);
      setConversation(p=>[...p, <ResultComponent key={"finish"}  question_answers={questions} evaluation_title={mockOBJ.mockTitle} evaluation_type={mockOBJ.mockType} mockID={mockID} user_details={mockOBJ.mockDesc}   />])
    }

    const handleAnswerSubmit = () =>{
      setQuestions(p=>{
        p[currentQuestionID].userAnswer=answer;
        return p;
      })
      setConversation(p=>[...p, <AnswerBubble key={`${currentQuestionID}-answer`} text={answer} />])
      setAnswer("");


      if(currentQuestionID < questions.length-1)
      {
        setConversation(p=>[...p,<QuestionBubble key={`${currentQuestionID+1}-question`} markText={questions[currentQuestionID+1].question} />])
        setCurrentQuestionID(p=>p+1);
      }else{
        handleFinish()
      }
    }


    


    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => {
      scrollToBottom();
    }, [conversation]);


    return (
    <TooltipProvider>
      <div className="grid h-screen w-full">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 justify-between">
            <h1 className="text-xl font-semibold">Mock Chat</h1>
            <Link href="/dashboard">
              <Button
                variant="destructive"
                size="sm"
                className="ml-auto gap-1.5 text-sm"
              >
                End Session
              </Button>
            </Link>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                AI71 Powered
              </Badge>
              <div className="flex-grow overflow-y-auto h-[100px] mt-6 pb-4 scrollbar-hide space-y-5 ">
                  {conversation}
                  <div ref={messagesEndRef} />
                {/* {interimResult && <li>{interimResult}</li>} */}
              </div>
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" onSubmit={e=>{e.preventDefault();handleAnswerSubmit();}} x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={answer}
                  disabled={finished}
                  onKeyDown={
                    (event) => {
                      if (event.key === 'Enter' && answer.trim())
                          handleAnswerSubmit();
                    }
                  }
                  onChange={e=>setAnswer(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 outline-none focus-visible:ring-offset-0"
                />
                <div className="flex items-center p-3 pt-0">
                 {/* {!error && <Tooltip>
                    <TooltipTrigger asChild>
                      <button variant="ghost" size="icon">
                        <Mic className={`size-4`}  />
                        <span className="sr-only">Use Microphone</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>} */}
                  <Button type="submit" disabled={finished} size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>

    )
}


function ResultComponent({question_answers,evaluation_title,evaluation_type,user_details,mockID}){
  const evaluationTitle="Full Stack Developer";
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [chartData, setChartData] = useState([
    { metric: "Proffesionalism", rating: 80 },
    { metric: "Communication", rating: 90 },
    { metric: "Patience", rating: 60 },
    { metric: "Knowledge", rating: 30 },
    { metric: "Positivity", rating: 10 },
    { metric: "Humor", rating: 10 },
  ])
  const [recommendation, setRecommendation] = useState("")

  const handleGenerateResult =async ()=>{
    setGenerating(true);
    try {

      let response =await axios.post(`/api/chat-evaluation-metrics`,{
        evaluation_title,
        evaluation_type,
        user_details,
        question_answers:JSON.stringify(question_answers)
      });

      let results = JSON.parse(response.data);
      await db.update(MockEval).set({ mockAIQuestions: JSON.stringify(question_answers), mockAIMetrics: JSON.stringify(results.metrics) , mockAIRecommentdations:results.recommendations }).where(eq(MockEval.mockID, mockID));
      setChartData(results.metrics)
      setRecommendation(results.recommendations);
      setGenerated(true);
    } catch (error) {
      console.log("Error in generating metrics",error);
    }
    setGenerating(false);
  }


  if(generated){
    return (
    <Card className="w-full flex flex-col items-center">
    <CardHeader>
      <CardTitle>{evaluationTitle}</CardTitle>
      <CardDescription className="text-center">Evaluation Result</CardDescription>
    </CardHeader>
    <CardContent>
        <ChartContainer
          config={{
            desktop: {
              label: "Rating",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="mx-auto  h-[320px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="rating"
              fill="black"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Keep Grinding you can improve this <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground text-center">
          Take ScreenShot & Share on your Linkedin
        </div>
        <Alert className="mt-4 w-full">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Feedback & Recommendations</AlertTitle>
          <AlertDescription>
            {recommendation}
          </AlertDescription>
        </Alert>
        <Link href="/dashboard">
          <Button>Back To Dashboard</Button>
        </Link>
      </CardFooter>
  </Card>
  )
  }
  return (
  <Card className="w-full">
      <CardHeader>
        <CardTitle>Are you Ready for Results</CardTitle>
        <CardDescription>{generating ? "Ai is generating your result ......":"Click Generate Result to get your result"}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={handleGenerateResult} disabled={generating}>Generate Result</Button>
      </CardFooter>
    </Card>); 
}

function QuestionBubble({markText}){
  const [loading, setLoading] = useState(true);
  function generateRandomNumber() {
    return Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
  }
  useEffect(() => {

    const sto = setTimeout(() => {
      setLoading(false);
    }, generateRandomNumber());
    
    return () => clearTimeout(sto);
  }, [])
  

  if(loading) {
    return (
    <li className="flex gap-x-2 sm:gap-x-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </li>
  )
}
  return (
  <li className="flex gap-x-2 sm:gap-x-4">
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
      {markText}
    </div>
  </li>
)
}

function AnswerBubble({text}){
  return (
  <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
    <div className="grow text-end space-y-3">
    <div className="inline-block bg-black rounded-lg p-4 shadow-sm">
        <p className="text-sm text-white">{text}</p>
    </div>
    </div>
</li>)
}

function Instructions(){
  return (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Instructions!</AlertTitle>
          <AlertDescription>
            <ul>
              <li>Don't Refresh Screen Before Finishing.</li>
              <li>Keep your answers relevent and concise.</li>
              <li>You can end session anytime and restart from dashboard.</li>
              <li>After Finishing and checking Results. you can return to your dashboard.</li>
            </ul>
          </AlertDescription>
        </Alert>
      )
}