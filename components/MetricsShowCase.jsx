"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
const MetricsShowCase = ({chartData}) => {
  return (
            <ChartContainer
              config={{
                desktop: {
                  label: "Rating",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="mx-auto  h-[320px] w-full"
            >
              <RadarChart  data={JSON.parse(chartData)}>
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
  )
}

export default MetricsShowCase