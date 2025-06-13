"use client";

import { AppLayout } from "@/components/app-layout";
import { TaskManager } from "@/components/task-manager";

export default function TasksPage() {
  return (
    <AppLayout title="Task Manager">
      <div className="max-w-3xl mx-auto">
         <TaskManager />
      </div>
    </AppLayout>
  );
}
