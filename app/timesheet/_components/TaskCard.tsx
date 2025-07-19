"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import TaskModal from "./TaskModal";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/lib/mockdata";

export default function TaskCard({
  task,
  weekId,
  onUpdate,
  onDelete,
}: {
  task: Task;
  weekId: string;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const { toast } = useToast();
  const [confirm, setConfirm] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); // ✅ New

  async function handleSave(updated: Task) {
    await fetch(`/api/entries/${weekId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    toast({
      title: "Updated!",
      description: `"${updated.project}" updated successfully.`,
      duration: 3000,
      className:
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-base rounded-xl shadow-lg border border-blue-300",
    });

    setShowUpdatePopup(true); // ✅ Show modal
    setTimeout(() => setShowUpdatePopup(false), 2000); // Auto close after 2s

    onUpdate();
  }

  async function handleDelete() {
    await fetch(`/api/entries/${weekId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });

    toast({
      title: "Deleted!",
      description: `"${task.project}" removed.`,
      variant: "destructive",
      duration: 3000,
      className:
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white text-base rounded-xl shadow-lg border border-red-300",
    });

    onDelete();
    setConfirm(false);
  }

  return (
    <>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex justify-between items-start gap-6 shadow-md hover:shadow-lg transition">
        <div className="flex flex-col gap-1 text-white w-full">
          <p className="text-lg font-bold text-blue-400">{task.project}</p>
          <p className="text-sm text-gray-300 font-medium">{task.type}</p>
          <p className="text-sm text-gray-200">{task.description}</p>
          <p className="text-sm text-gray-400 mt-1">Hours: {task.hours}</p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <TaskModal
            trigger={
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            }
            initialData={task}
            onSave={handleSave}
          />

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setConfirm(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <Dialog open={confirm} onOpenChange={setConfirm}>
            <DialogContent className="bg-gray-800 text-white rounded-md">
              <DialogHeader>
                <DialogTitle className="text-red-500">
                  Confirm delete
                </DialogTitle>
                <p className="text-sm text-gray-300 mt-2">
                  Are you sure you want to delete "<strong>{task.project}</strong>"?
                </p>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-300"
                  onClick={() => setConfirm(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ✅ Update Success Modal */}
      <Dialog open={showUpdatePopup} onOpenChange={setShowUpdatePopup}>
        <DialogContent className="bg-green-700 text-white rounded-lg text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Update Successful</DialogTitle>
            <p className="text-sm mt-2">"{task.project}" was successfully updated.</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
