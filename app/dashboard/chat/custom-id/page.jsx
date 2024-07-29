"use client"
import {
    CornerDownLeft,
    Mic
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
export default function ChatInterface() {
    return (
    <TooltipProvider>
      <div className="grid h-screen w-full mt-20">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Mock Chat</h1>
          
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              Dashboard
            </Button>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge>
              <div className="flex-1">
                <ul className="mt-16 space-y-5">
                    {/* Chat Bubble */}
                    <li className="flex gap-x-2 sm:gap-x-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                        <h2 className="font-medium text-gray-800 dark:text-white">
                            How can we help?
                        </h2>
                        <div className="space-y-1.5">
                            <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                            You can ask questions like:
                            </p>
                            <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                            <li className="text-sm text-gray-800 dark:text-white">
                                What's Preline UI?
                            </li>
                            <li className="text-sm text-gray-800 dark:text-white">
                                How many Starter Pages &amp; Examples are there?
                            </li>
                            <li className="text-sm text-gray-800 dark:text-white">
                                Is there a PRO version?
                            </li>
                            </ul>
                        </div>
                        </div>
                    </li>
                    {/* End Chat Bubble */}
                    {/* Chat Bubble */}
                    <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                        <div className="grow text-end space-y-3">
                        {/* Card */}
                        <div className="inline-block bg-black rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-white">what's preline ui?</p>
                        </div>
                        {/* End Card */}
                        </div>
                    </li>
                    {/* End Chat Bubble */}
                </ul>
                {/* {interimResult && <li>{interimResult}</li>} */}
              </div>
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                 {!error && <Tooltip>
                    <TooltipTrigger asChild>
                      <button variant="ghost" size="icon">
                        <Mic className={`size-4`}  />
                        <span className="sr-only">Use Microphone</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>}
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
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