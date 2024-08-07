"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db';
import { MockEval } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function DashHistoryComponent({userId}){
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async()=>{
            const r = await db.select().from(MockEval).where(eq(MockEval.createdByID,userId)).execute();
            setResults(r)
            setLoading(false);
        })()
    }, [])

    if(loading){
        return (<Skeleton className="w-[300px] h-[150px]" />)
    }
    return results.map(e=>(
      <Card key={e.mockID} className="min-w-[300px]">
          <CardHeader>
              <CardTitle  className="text-xl font-bold uppercase">{e.mockTitle}</CardTitle>
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
    ))
  }
  