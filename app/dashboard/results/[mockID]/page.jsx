import MetricsShowCase from "@/components/MetricsShowCase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { MockEval } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { TrendingUp } from "lucide-react";
import { Terminal } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Page ({params}) {
const { mockID } = params
const results = await db.select().from(MockEval).where(eq(MockEval.mockID,mockID)).limit(1).execute();
  if(results[0].mockAIMetrics && results[0].mockAIRecommentdations){
    return (
      <Card className="w-full flex flex-col items-center mt-20">
      <Button  variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
      </Button>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{results[0].mockTitle}</CardTitle>
        <CardDescription className="text-center">Evaluation Result</CardDescription>
      </CardHeader>
      <CardContent>
          <MetricsShowCase chartData={JSON.parse(results[0].mockAIMetrics)}/>
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
              {results[0].mockAIRecommentdations}
            </AlertDescription>
          </Alert>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
      </CardFooter>
    </Card>
    )
  }
  return (
    <Card className="w-full flex flex-col items-center mt-20 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{results[0].mockTitle}</CardTitle>
        <CardDescription className="text-center">Incompleted Evaluation (Complete it first)</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-4">
        <Link href={results[0].isCall ?`/dashboard/call/${results[0].mockID}`:`/dashboard/chat/${results[0].mockID}`}>
          <Button>Complete your Evaluation</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


