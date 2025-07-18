"use client"

import { GaugeCircle, Hourglass } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type WeeklyOverviewProps = {
  weekNumber: number
  totalHours: number
}

export default function WeeklyOverview({
  weekNumber,
  totalHours,
}: WeeklyOverviewProps) {
  const targetHours = 40 // fixed value
  const completionPercentage = targetHours > 0 ? Math.round((totalHours / targetHours) * 100) : 0
  const progressValue = Math.min(completionPercentage, 100)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Week {weekNumber}</h1>
        <Link href="/dashboard" passHref>
          <Button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Stats Card */}
      <Card className="bg-[#111827] border border-[#2e2e3e] text-white p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Hours */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-700/20 text-blue-400">
              <Hourglass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">{totalHours}h</p>
              <p className="text-sm text-gray-400">Total Hours</p>
            </div>
          </div>

          {/* Target Hours */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-700/20 text-green-400">
              <GaugeCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{targetHours}h</p>
              <p className="text-sm text-gray-400">Target Hours</p>
            </div>
          </div>

          {/* Completion % */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-700/20 text-yellow-400">
              <GaugeCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">{completionPercentage}%</p>
              <p className="text-sm text-gray-400">Complete</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Weekly Progress</span>
            <span>{totalHours}h / {targetHours}h</span>
          </div>
          <Progress
            value={progressValue}
className="h-2 bg-gray-700 [&>*]:bg-blue-500"          />
        </div>
      </Card>
    </div>
  )
}
