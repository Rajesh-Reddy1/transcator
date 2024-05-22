"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@/components/icons/TrashIcon";
import { Calendar } from "@/components/ui/calendar";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import { useAuth } from "@/components/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface Task {
  name: string;
  dueDate: Date;
  completed: boolean;
  id: string;
}
import Home from "@/app/Home/page";
export default function To_Do() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(
    undefined
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const { userEmail } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (userEmail) {
      const tasksRef = collection(db, "users", userEmail, "Tasks");
      const q = query(tasksRef);
      const querySnapshot = await getDocs(q);
      const fetchedTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        fetchedTasks.push({
          ...doc.data(),
          id: doc.id,
          // Convert the Timestamp to a Date object
          dueDate: doc.data().dueDate.toDate(),
        } as Task);
      });
      setTasks(fetchedTasks);
    }
    else {
      console.error("User is not logged in");
    }
  };
    fetchTasks();
  }, [userEmail]);

  const addTask = async () => {
    if (userEmail) {
    if (newTaskDueDate && newTaskName.trim() !== "") {
      const docRef = await addDoc(collection(db, "users", userEmail, "Tasks"), {
        name: newTaskName,
        dueDate: newTaskDueDate,
        completed: false,
      });
      setTasks([
        ...tasks,
        {
          name: newTaskName,
          dueDate: newTaskDueDate,
          completed: false,
          id: docRef.id,
        },
      ]);
      setNewTaskName("");
      setNewTaskDueDate(undefined);
      setShowCalendar(false);
    }}
    else {
      console.error("User is not logged in");
    }
  };

  const deleteTask = async (taskId: string) => {
    if (userEmail) {
      await deleteDoc(doc(db, "users", userEmail, "Tasks", taskId));
      setTasks(tasks.filter((task) => task.id !== taskId));
    } else {
      console.error("User is not logged in");
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    if (userEmail) {
      const taskRef = doc(db, "users", userEmail, "Tasks", taskId);
      await updateDoc(taskRef, {
        completed: !tasks.find((task) => task.id === taskId)!.completed,
      });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } else {
      console.error("User is not logged in");
    }
  };
  return (
    <div className="flex h-screen">
      <Home></Home>
      <div className="flex-grow">
    <div key="1" className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <form
            className="flex items-center mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <Input
              className="flex-1 mr-4 bg-white dark:bg-gray-950"
              placeholder="Add a new task..."
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <div className="relative flex-1 mr-4">
              {/* Add relative positioning to the container */}
              <Input
                className="flex-1 mr-4 bg-white dark:bg-gray-950"
                placeholder="Pick a date..."
                type="text"
                value={
                  newTaskDueDate ? newTaskDueDate.toLocaleDateString() : ""
                }
                onFocus={() => setShowCalendar(true)}
                readOnly
              />
              {showCalendar && (
                <div className="absolute z-10">
                  {/* Add relative positioning to the container */}
                  <Calendar
                    mode="single"
                    selected={newTaskDueDate}
                    onSelect={(date) => {
                      setNewTaskDueDate(date);
                      setShowCalendar(false);
                    }}
                    className="rounded-md border"
                  />
                </div>
              )}
            </div>
            <Button type="submit">Add Task</Button>
          </form>
          <div className="grid grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <Card key={task.id} className="bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label
                      className={`ml-2 font-medium ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                      htmlFor={`task-${task.id}`}
                    >
                      {task.name}
                    </label>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Due date:{" "}
                  {task.dueDate
                    ? task.dueDate.toLocaleDateString() // Now task.dueDate is a Date object
                    : "N/A"}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
    </div>
    </div>
  );
}
