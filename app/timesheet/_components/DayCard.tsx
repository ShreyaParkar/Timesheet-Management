"use client";

import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/lib/mockdata";

export default function DayCard({
  date,
  tasks = [],
  weekId,
  onAdd,
  onUpdate,
  onDelete,
}: {
  date: string;
  tasks?: Task[];
  weekId: string;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const totalHours = tasks.reduce((a, t) => a + (t.hours || 0), 0);
  const { toast } = useToast();

  function handleAdd(task: Task) {
    fetch(`/api/entries/${weekId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      onAdd();
      toast({
        description: "Task added successfully.",
        className: "bg-black text-white bottom-4 fixed left-1/2 transform -translate-x-1/2 z-50",
        duration: 2500,
      });
    });
  }

  return (
    <Card className="bg-[#0f172a] border border-[#1e293b] p-6 rounded-xl shadow-md space-y-5">
      <div className="flex justify-between items-center border-b border-[#1e293b] pb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-sky-400">
            {format(parseISO(date), "EEEE, MMM d")}
          </h3>
          <p className="text-sm text-gray-400">
            Total:{" "}
            <Badge className="bg-sky-600 text-white">{totalHours}h</Badge>
          </p>
        </div>

        <TaskModal
          trigger={
            <Button
              className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 px-4 py-2 rounded-md text-sm"
              variant="default"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          }
          initialData={{
            date,
            project: "",
            type: "",
            description: "",
            hours: 1,
          }}
          onSave={handleAdd}
        />
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            weekId={weekId}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
