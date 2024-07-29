import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
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
import { Textarea } from '@/components/ui/textarea'
const Dashboard = () => {
  return (
    <div className="bg-white py-24 md:px-24 px-5 sm:py-32">
      <div className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Evaluation</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit.
          </p>
        </div>
        
        <br className="border-blue-100 border-x-2" />

        <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-2">
                <Sheet >
                    <SheetTrigger asChild>
                        <Button>Create Chat Evaluation</Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                        <SheetTitle>Create New Evaluation</SheetTitle>
                        <SheetDescription>
                            Completely fill all fields. Click create when you're done.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-8">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-title">
                                Evalution Title / Job Title
                            </Label>
                            <Input id="eval-title" placeholder="Ex. Full Stack Devloper, Personality Development" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-type">
                                    Select Type of Evalution
                            </Label>
                            <Select id="eval-type" className="w-full">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a catagory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Catagories</SelectLabel>
                                    <SelectItem value="grapes">Personality Development</SelectItem>
                                    <SelectItem value="apple">Technical Evaluation</SelectItem>
                                    <SelectItem value="banana">Behavioral Evaluation</SelectItem>
                                    <SelectItem value="blueberry">Communication Skills</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-age">
                                Age
                            </Label>
                            <Input id="eval-age" min="5" max="100" placeholder="Ex. 5-100 years" type="number" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-details">
                                Tell us about your yourself in details
                            </Label>
                            <Textarea id="eval-details" placeholder="Exp. Your Skills / Personality / Habits / Proffesional Experience / Strength and Weakness" className="w-full"/>
                        </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button type="submit">Create New Evalution</Button>
                        </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Sheet >
                    <SheetTrigger asChild>
                        <Button variant="outline">Create Audio Call Evaluation</Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                        <SheetTitle>Create New Evalution Audio Call</SheetTitle>
                        <SheetDescription>
                            Completely fill all fields. Click start when you're done and ready for audio call.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-8">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-title">
                                Evalution Title / Job Title
                            </Label>
                            <Input id="eval-title" placeholder="Ex. Full Stack Devloper, Personality Development" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-type">
                                    Select Type of Evalution
                            </Label>
                            <Select id="eval-type" className="w-full">
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
                            <Input id="eval-age" min="5" max="100" placeholder="Ex. 5-100 years" type="number" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="eval-details">
                                Tell us about your yourself in details
                            </Label>
                            <Textarea id="eval-details" placeholder="Exp. Your Skills / Personality / Habits / Proffesional Experience / Strength and Weakness" className="w-full"/>
                        </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button type="submit">Start Audio Call</Button>
                        </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>

       

        {/* something */}
      </div>
    </div>
  )
}

export default Dashboard