"use client"
import {useState,useEffect} from 'react'
import { Card } from './ui/card'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"   
import { Textarea } from '@/components/ui/textarea'
import { useClerk } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { MockEval } from '@/lib/schema'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const CreateEvaluationCard = () => {
    const {user}  = useClerk()
    const router = useRouter();
    const [confirmationOpened, setConfirmationOpened] = useState(false)
    const [aiAnalyzing, setAiAnalyzing] = useState(false)
    const [data, setData] = useState(null)


    const handleChatSubmit = async (title,type,age,details,cvText)=>{
        setConfirmationOpened(true);

        
        setAiAnalyzing(true)
        try{
            let data_for_api = {
                evaluation_title:title,
                evaluation_type:type,
                user_details:details,
                user_age:age,
                user_id:user.id,
                user_resume: cvText ?? null
            }
            
            let response =await axios.post(`/api/chat-interview-questions`,data_for_api);
            
            let questions =response.data;
            
            setData({
                createdByID: user.id,
                createdByName: user.firstName,
                createdAt: new Date().toISOString(), 
                mockTitle: title,
                mockAIQuestions:questions,
                mockDesc:details ,
                mockType: type,
                mockCVText: cvText,
                mockUserAge: age,
                mockID: crypto.randomUUID(),
                isCall: false
            })
            // let questions =await response.json();
        }catch(e){
            console.log("Error in Fetching Questions for Mock Chat" ,e);
            setConfirmationOpened(false);
        }
        setAiAnalyzing(false)       
    }

    const handleCallSubmit = (title,type,age,details,cvText)=>{
        setConfirmationOpened(true);
        setData({
            createdByID: user.id,
            createdByName: user.firstName,
            createdAt: new Date().toISOString(), 
            mockTitle: title,
            mockDesc:details ,
            mockType: type,
            mockCVText: cvText,
            mockUserAge: age,
            mockID: crypto.randomUUID(),
            isCall: true
        })
    }
    const handleConfirm =async ()=>{
        if(data==null)return;
        try {
            await db.insert(MockEval).values(data).execute();
            console.log('Data inserted successfully');
        } catch (error) {
            console.error('Error inserting data to DB:', error);
        }
        if(data.isCall){
            router.push(`/dashboard/call/${data.mockID}`);
        }else{
            router.push(`/dashboard/chat/${data.mockID}`);
        }
    }
    
    return (
        <Card className="flex flex-col gap-2 w-[300px] justify-center p-7">
            <AlertDialog open={confirmationOpened} onOpenChange={open=>setConfirmationOpened(open)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to Create this evaluation?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {aiAnalyzing ? "Analyzing your data through AI .....":"Analyzing your data through AI: Completed"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={aiAnalyzing} onClick={handleConfirm}>Start Now</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <CustomSheet handleSubmit={handleChatSubmit} submitButtonText={"Create New Evalution"} sheetDescription={"Completely fill all fields. Click create when you're done."} sheetTitle={"Create New Chat Evaluation"}  triggerButtonText={"Create Chat Evaluation"} triggerButtonVarient={""}  />
            <CustomSheet handleSubmit={handleCallSubmit} submitButtonText={"Start Audio Call"} sheetDescription={"Completely fill all fields. Click start when you're done and ready for audio call."} sheetTitle={"Create New Evalution Audio Call"} triggerButtonText={"Create Audio Call Evaluation"}  triggerButtonVarient={"outline"}  />
        </Card>
  )
}

function CustomSheet({triggerButtonText,triggerButtonVarient,submitButtonText, sheetTitle ,sheetDescription,handleSubmit}){
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [age, setAge] = useState("");
    const [details, setDetails] = useState("");
    const [cvText, setCvText] = useState("");
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        if(title!=="" && type!=="" && details!=="" && age>=5 && age<=100){
            setCompleted(true);
        }
    }, [title,type,details ,age])
    
    const clearAllfields=()=>{
        setTitle("");
        setType("");
        setAge("");
        setDetails("");
        setCvText("");
        setLoading(false);
        setCompleted(false);
    }


    const handleCVChange =async (event) => {
        const pdfFile = event.target.files[0];
        if (pdfFile) {
            const formData = new FormData();
            formData.append('pdfFile', pdfFile);
            setLoading(true)
            try {
                const response = await fetch('/api/pdf-parser', {
                    method: 'POST',
                    body: formData,
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setCvText(data.text);
            } catch (error) {
                console.error('Error:', error);
            }
            setLoading(false)
        }        
    }

    return (
        <Sheet >
                    <SheetTrigger asChild>
                        <Button variant={triggerButtonVarient}>{triggerButtonText}</Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                        <SheetTitle>{sheetTitle}</SheetTitle>
                        <SheetDescription>{sheetDescription}</SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-8">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-title">
                                Evalution Title / Job Title
                            </Label>
                            <Input onChange={e=>setTitle(e.target.value)} value={title} id="eval-title" placeholder="Ex. Full Stack Devloper, Personality Development" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-type">
                                    Select Type of Evalution
                            </Label>
                            <Select value={type} onValueChange={v=>setType(v)} id="eval-type" className="w-full">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a catagory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Catagories</SelectLabel>
                                    <SelectItem value="Personality Development">Personality Development</SelectItem>
                                    <SelectItem value="Technical Evaluation">Technical Evaluation</SelectItem>
                                    <SelectItem value="Behavioral Evaluation">Behavioral Evaluation</SelectItem>
                                    <SelectItem value="Communication Skills">Communication Skills</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-age">
                                Age
                            </Label>
                            <Input onChange={e=>setAge(e.target.value)} value={age} id="eval-age" min="5" max="100" placeholder="Ex. 5-100 years" type="number" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-details">
                                Tell us about your yourself in details
                            </Label>
                            <Textarea onChange={e=>setDetails(e.target.value)} value={details} id="eval-details" placeholder="Exp. Your Skills / Personality / Habits / Proffesional Experience / Strength and Weakness" className="w-full"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-cv">Resume/CV</Label>
                            <Input id="eval-cv" onChange={handleCVChange} accept="application/pdf" type="file" />
                        </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button onClick={clearAllfields} variant="outline">Cancel</Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button type="submit" onClick={()=>handleSubmit(title,type,age,details,cvText)} disabled={loading || !completed} className="mb-2 md:mb-2">{submitButtonText}</Button>
                        </SheetClose>
                        </SheetFooter> 
                    </SheetContent>
                </Sheet>
    ); 
}


export default CreateEvaluationCard