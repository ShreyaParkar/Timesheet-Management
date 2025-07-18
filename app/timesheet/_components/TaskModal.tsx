"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, Edit, Calendar, Clock } from "lucide-react"

type Task = {
  id?: string
  date: string
  project: string
  type: string
  description: string
  hours: number
}

type TaskModalProps = {
  trigger: React.ReactNode
  initialData?: Task
  onSave: (task: Task) => void
}

export default function TaskModal({ trigger, initialData, onSave }: TaskModalProps) {
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState<Task>(
    initialData || {
      date: "",
      project: "",
      type: "",
      description: "",
      hours: 0,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask((prev) => ({
      ...prev,
      [name]: name === "hours" ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = () => {
    if (!task.project || !task.type || !task.description || !task.date || task.hours <= 0) {
      alert("Please fill all fields correctly.")
      return
    }

    onSave({
      ...task,
      id: task.id || Date.now().toString(),
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-gray-900/95 backdrop-blur-lg border-gray-700/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gradient flex items-center gap-2">
            {initialData ? (
              <>
                <Edit className="w-5 h-5" />
                Edit Task
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add New Task
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input 
              type="date" 
              name="date" 
              value={task.date} 
              onChange={handleChange}
              className="bg-gray-800/50 border-gray-600 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project" className="text-gray-300">Project</Label>
            <Input 
              name="project" 
              value={task.project} 
              onChange={handleChange} 
              placeholder="e.g. CRM UI"
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="text-gray-300">Type of Work</Label>
            <Input 
              name="type" 
              value={task.type} 
              onChange={handleChange} 
              placeholder="e.g. Development"
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea 
              name="description" 
              value={task.description} 
              onChange={handleChange} 
              placeholder="What did you work on?"
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hours" className="text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Hours
            </Label>
            <Input 
              type="number" 
              name="hours" 
              value={task.hours} 
              onChange={handleChange} 
              placeholder="e.g. 8"
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
          >
            {initialData ? "Update Task" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}