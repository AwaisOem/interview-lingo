import CreateEvaluationCard from '@/components/CreateEvaluationCard'
import DashHistoryComponent from '@/components/DashHistoryComponent'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
const Dashboard =async () => {
  const user = await currentUser();
  if(!user)return <></>
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
            <DashHistoryComponent userId={user.id} />
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