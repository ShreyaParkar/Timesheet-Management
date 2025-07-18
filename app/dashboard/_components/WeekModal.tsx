"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar, Plus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (id: string, label: string) => void;
};

export default function WeekModal({ open, onClose, onAdd }: Props) {
  const [weekNumber, setWeekNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!weekNumber || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    const id = `week-${weekNumber}`;
    const startFormatted = new Date(startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endFormatted = new Date(endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const label = `Week ${weekNumber} (${startFormatted} - ${endFormatted})`;

    onAdd(id, label);

    setWeekNumber("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1f] text-white border border-[#2e2e3e] shadow-lg rounded-lg max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-blue-600/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <DialogTitle className="text-lg font-bold tracking-wide text-white">
              Add New Week
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="weekNumber" className="text-sm font-medium text-white">
              Week Number
            </Label>
            <Input
              id="weekNumber"
              type="number"
              value={weekNumber}
              onChange={(e) => setWeekNumber(e.target.value)}
              placeholder="e.g. 30"
              className="bg-[#2a2a30] border border-gray-700 text-white placeholder-gray-400 h-11 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm font-medium text-white">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#2a2a30] border border-gray-700 text-white h-11 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-sm font-medium text-white">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#2a2a30] border border-gray-700 text-white h-11 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <DialogFooter className="pt-3">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 hover:scale-[1.03]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Week
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
