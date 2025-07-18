'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Eye } from 'lucide-react'

export type Timesheet = {
  id: string
  weekLabel: string
  totalHours: number
  targetHours: number
  status: 'Complete' | 'Incomplete' | 'Missing'
}

type Props = {
  sheet: Timesheet
}

export default function TimesheetCard({ sheet }: Props) {
  const getStatusBadge = () => {
    switch (sheet.status) {
      case 'Complete':
        return <Badge className="bg-blue-600 text-white">Complete</Badge>
      case 'Incomplete':
        return <Badge className="bg-gray-600 text-white">Incomplete</Badge>
      case 'Missing':
        return <Badge className="bg-red-600 text-white">Missing</Badge>
    }
  }

  const progressPercent = Math.min((sheet.totalHours / sheet.targetHours) * 100, 100)
  const isOvertime = sheet.totalHours > sheet.targetHours

  return (
    <Card className="bg-[#111827] border border-gray-700/50 rounded-xl shadow hover:shadow-blue-500/10 transition-all">
      <CardContent className="p-5 space-y-4">
        {/* Week Label + Status Badge */}
        <div className="flex justify-between items-center">
          <h3 className="text-md sm:text-lg font-semibold text-white">{sheet.weekLabel}</h3>
          {getStatusBadge()}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Progress</span>
            <span className="ml-auto">{sheet.totalHours}h / {sheet.targetHours}h</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full">
            <div
              className={`h-2 rounded-full ${isOvertime ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-400 flex justify-between">
            <span>{Math.round(progressPercent)}% Complete</span>
            {isOvertime && (
              <span className="text-red-400">+{sheet.totalHours - sheet.targetHours}h overtime</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/timesheet/${sheet.id}`} className="block pt-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Eye className="w-4 h-4 mr-2" />
            View & Manage Tasks
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
