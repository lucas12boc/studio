"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Trash2, CalendarIcon, Edit3, XCircle } from "lucide-react";
import { format } from "date-fns";

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("incomeInsightsTasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Ensure due dates are Date objects
        const tasksWithDateObjects = parsedTasks.map((task: Task) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(tasksWithDateObjects);
      } catch (error) {
        console.error("Failed to parse tasks from local storage:", error);
        setTasks([]); // Fallback to empty array on error
      }
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("incomeInsightsTasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(), // Simple unique ID
      text: newTaskText.trim(),
      completed: false,
      dueDate: newTaskDueDate,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText("");
    setNewTaskDueDate(undefined);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const handleEditTask = (taskId: string) => {
    if (editingTaskText.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editingTaskText.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <PlusCircle className="h-6 w-6 text-primary" />
            Add New Task
          </CardTitle>
          <CardDescription>Plan your steps to achieve your income goals.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTask} className="space-y-4">
            <Input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="e.g., Research freelancing platforms"
              className="text-base"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full sm:w-auto justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTaskDueDate ? format(newTaskDueDate, "PPP") : <span>Pick a due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newTaskDueDate}
                    onSelect={setNewTaskDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {pendingTasks.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Pending Tasks ({pendingTasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                {pendingTasks.map((task) => (
                    <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border hover:shadow-sm transition-shadow"
                    >
                    {editingTaskId === task.id ? (
                        <div className="flex-grow flex items-center gap-2">
                            <Input 
                                type="text" 
                                value={editingTaskText} 
                                onChange={(e) => setEditingTaskText(e.target.value)}
                                className="text-sm"
                                autoFocus
                            />
                            <Button size="sm" onClick={() => handleEditTask(task.id)} variant="ghost" className="text-green-600 hover:text-green-700">Save</Button>
                            <Button size="sm" onClick={() => setEditingTaskId(null)} variant="ghost" className="text-red-600 hover:text-red-700">Cancel</Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                                aria-label={`Mark task ${task.text} as ${task.completed ? 'pending' : 'completed'}`}
                                />
                                <label htmlFor={`task-${task.id}`} className={`flex-grow cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                {task.text}
                                {task.dueDate && (
                                    <span className="ml-2 text-xs text-muted-foreground">
                                    (Due: {format(task.dueDate, "MMM d")})
                                    </span>
                                )}
                                </label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={() => startEditing(task)} aria-label="Edit task">
                                    <Edit3 className="h-4 w-4 text-blue-600 hover:text-blue-700" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                                    <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
                                </Button>
                            </div>
                        </>
                    )}
                    </li>
                ))}
                </ul>
            </CardContent>
        </Card>
      )}
      
      {completedTasks.length > 0 && (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Completed Tasks ({completedTasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                {completedTasks.map((task) => (
                    <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                    >
                    <div className="flex items-center gap-3">
                        <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        aria-label={`Mark task ${task.text} as ${task.completed ? 'pending' : 'completed'}`}
                        />
                        <label htmlFor={`task-${task.id}`} className="flex-grow line-through text-muted-foreground">
                        {task.text}
                        </label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                        <XCircle className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                    </li>
                ))}
                </ul>
            </CardContent>
        </Card>
      )}

      {tasks.length === 0 && (
         <Card className="text-center py-8 bg-muted/30">
            <CardContent>
                <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tasks yet. Add some tasks to get started!</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
