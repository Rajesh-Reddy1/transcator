'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@/components/icons/TrashIcon";
import { Calendar } from "@/components/ui/calendar"

import { Card } from "@/components/ui/card";
import { useState } from "react";
import '@/app/globals.css'

type Task = {
  name: string;
  dueDate: string;
  completed: boolean;
};

export default function To_Do() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const addTask = () => {
    setTasks([...tasks, { name: newTaskName, dueDate: newTaskDueDate, completed: false }]);
    setNewTaskName('');
    setNewTaskDueDate('');
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div key="1" className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <form className="flex items-center mb-6" onSubmit={e => { e.preventDefault(); addTask(); }}>
            <Input
              className="flex-1 mr-4 bg-white dark:bg-gray-950"
              placeholder="Add a new task..."
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <Input
              className="flex-1 mr-4 bg-white dark:bg-gray-950"
              placeholder="Due date..."
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
            <Button type="submit">Add Task</Button>
          </form>
          <div className="grid grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <Card key={index} className="bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id={`task-${index}`} checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
                    <label
                      className={`ml-2 font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                      htmlFor={`task-${index}`}
                    >
                      {task.name}
                    </label>
                  </div>
                  <Button size="icon" variant="destructive" onClick={() => deleteTask(index)}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Due date: {task.dueDate}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
