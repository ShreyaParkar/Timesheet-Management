'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import TimesheetCard, { Timesheet } from './_components/TimesheetCard'
import WeekModal from './_components/WeekModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mockTimesheets } from '@/lib/mockdata'
import { Plus, CalendarDays } from 'lucide-react'

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setTimesheets(mockTimesheets)
  }, [])

  const handleAddWeek = (id: string, weekLabel: string) => {
    const newTimesheet: Timesheet = {
      id,
      weekLabel,
      totalHours: 0,
      targetHours: 40,
      status: 'Missing',
    }
    setTimesheets((prev) => [...prev, newTimesheet])
  }

  const completed = timesheets.filter((t) => t.status === 'Complete').length
  const progressPercent = Math.round((completed / timesheets.length) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Header />

      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-2">
          <div className="flex justify-center items-center gap-3">
            <CalendarDays className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
              Chronofy	
            </h1>
          </div>
          <p className="text-gray-400 text-md max-w-2xl mx-auto">
            Streamline your workflow with intelligent time tracking and comprehensive weekly reporting
          </p>
        </section>

        {/* Header Row */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-gray-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold">Weekly Timesheets</h2>
            <p className="text-sm text-gray-400">
              {completed} of {timesheets.length} weeks completed · {progressPercent}% progress
            </p>
          </div>

          <Button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Week
          </Button>
        </div>

        {/* Timesheet Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {timesheets.map((sheet) => (
            <TimesheetCard key={sheet.id} sheet={sheet} />
          ))}
        </section>
      </main>

      <Footer />

      {/* Add Week Modal */}
      <WeekModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddWeek}
      />
    </div>
  )
}
