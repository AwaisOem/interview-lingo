import CreateEvaluationCard from '@/components/CreateEvaluationCard'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'
import { MockEval } from '@/lib/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
const Dashboard =async () => {
  const user = await currentUser();
  if(!user)return <></>
  const results = await db.select().from(MockEval).where(eq(MockEval.createdByID,user.id)).execute();
  return (
    <div className="bg-white py-24 md:px-24 px-5 sm:py-32">
      <div className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hi {user.firstName},Create Your Evaluation</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            you can create mock evaluation in voice and chat format
          </p>
        </div>
        
        <br className="border-blue-100 border-x-2" />

        <div className="flex flex-wrap gap-3">
            <CreateEvaluationCard/>
                {results.map(e=>(
                    <Card key={e.mockID} className="w-[300px]">
                        <CardHeader>
                            <CardTitle>{e.mockTitle}</CardTitle>
                            <CardDescription className="truncate">#{e.mockID}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex gap-3 justify-between items-stretch">
                          <Link className='w-full'  href={e.isCall ? `/dashboard/call/${e.mockID}`:`/dashboard/chat/${e.mockID}`}>
                            <Button className="flex-1 w-full">Restart {e.isCall ?"Call":"Chat"}</Button>
                          </Link>
                          {(e.mockAIMetrics || e.mockAIRecommentdations) && 
                          <Link className='w-full' href={`/dashboard/results/${e.mockID}`}>
                            <Button variant="outline" className="flex-1 w-full">Results</Button>
                          </Link>}
                        </CardFooter>
                    </Card>
                ))}
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Ai CV Analyzer</CardTitle>
            <CardDescription>You can upload your cv for analyze and generate recommended jobs for you</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Link href="/dashboard/jobs">
              <Button>Get Job Recommendations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard