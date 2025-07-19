"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeekHeader from "../_components/WeekHeader";
import DayCard from "../_components/DayCard";
import { Task } from "@/lib/mockdata";

export default function WeekPage() {
  const { weekId } = useParams();
  const [entries, setEntries] = useState<Task[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch(`/api/entries/${weekId}`);
      const data = await res.json();
      setEntries(data);
    }
    if (weekId) fetchEntries();
  }, [weekId, reloadKey]);

  const handleAdd = () => setReloadKey((p) => p + 1);
  const handleUpdate = () => setReloadKey((p) => p + 1);
  const handleDelete = () => setReloadKey((p) => p + 1);

  const totalHours = entries.reduce((a, t) => a + t.hours, 0);
  const byDate = entries.reduce<Record<string, Task[]>>((a, t) => {
    (a[t.date] ||= []).push(t);
    return a;
  }, {});

  const weekNumber = weekId ? parseInt((weekId as string).split("-")[1]) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-10 space-y-6">
        <WeekHeader weekNumber={weekNumber} totalHours={totalHours} />
        <div className="space-y-4">
          {Object.entries(byDate).map(([date, tasks]) => (
            <DayCard
              key={date}
              date={date}
              weekId={weekId as string}
              tasks={tasks}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
