"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "@/components/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import dayjs from "dayjs";
import {
  CheckIcon,
  CircleIcon,
  CalendarIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  dueDate: Date;
  completed: boolean;
  completionNote?: string;
  completedDate?: Date | null;
}

export default function Component() {
  const { userEmail } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    dueDate: dayjs().format("YYYY-MM-DD"), // Default due date to today
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (userEmail) {
        const today = dayjs().startOf("day").toDate();
        const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

        const tasksRef = collection(db, "users", userEmail, "Tasks");
        const q = query(
          tasksRef,
          where("dueDate", ">=", today),
          where("dueDate", "<", tomorrow),
          orderBy("dueDate", "asc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedTasks: Task[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              dueDate: doc.data().dueDate.toDate(),
            } as Task)
        );

        setTasks(fetchedTasks);
      } else {
        console.error("User is not logged in");
      }
    };
    fetchTasks();
  }, [userEmail]);

  const handleAddTask = async () => {
    if (newTask.title.trim() !== "" && userEmail) {
      try {
        const docRef = await addDoc(
          collection(db, "users", userEmail, "Tasks"),
          {
            ...newTask,
            completed: false,
            dueDate: new Date(newTask.dueDate),
            completionNote: "",
            completedDate: null,
          }
        );
        setTasks([
          ...tasks,
          {
            id: docRef.id,
            ...newTask,
            completed: false,
            dueDate: new Date(newTask.dueDate),
            completionNote: "",
            completedDate: null,
          },
        ]);
        setNewTask({
          title: "",
          description: "",
          category: "",
          priority: "medium",
          dueDate: dayjs().format("YYYY-MM-DD"),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleEditTask = async (id: string, updates: Partial<Task>) => {
    if (userEmail) {
      try {
        const taskRef = doc(db, "users", userEmail, "Tasks", id);
        await updateDoc(taskRef, updates);
        setTasks(
          tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  };

  const handleCompleteTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);

    if (task && userEmail) {
      const completionNote = prompt("Add a completion note (optional):");
      try {
        const taskRef = doc(db, "users", userEmail, "Tasks", id);
        await updateDoc(taskRef, {
          completed: !task.completed,
          completionNote: completionNote || "",
          completedDate: !task.completed ? serverTimestamp() : null,
        });
        setTasks(
          tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completionNote: completionNote || "",
                  completedDate: !t.completed ? new Date() : null,
                }
              : t
          )
        );
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (userEmail) {
      try {
        await deleteDoc(doc(db, "users", userEmail, "Tasks", id));
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background py-4 shadow">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <h1 className="text-2xl font-bold">Daily Tasks</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleAddTask}
              className="rounded-md px-4 py-2 text-sm font-medium"
            >
              Add Task
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* "Add New Task" Section */}
          <div className="rounded-lg border border-muted bg-background p-4 shadow">
            <h2 className="mb-4 text-lg font-bold">Add New Task</h2>
            <div className="space-y-4">
              <Input
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <div className="flex items-center justify-between">
                <Select
                  value={newTask.category}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
              <Button
                onClick={handleAddTask}
                className="w-full rounded-md px-4 py-2 text-sm font-medium"
              >
                Add Task
              </Button>
            </div>
          </div>

          {/* "To Do" Section */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="md:col-span-2">
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="rounded-lg border border-muted bg-background p-4 shadow"
                  >
                    <h2 className="mb-4 text-lg font-bold">
                      Today's Tasks ({dayjs().format("MMMM D, YYYY")})
                    </h2>
                    <div>
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`rounded-lg border transition-colors mb-4 ${
                                !task.completed &&
                                dayjs(task.dueDate).isBefore(
                                  dayjs().startOf("day")
                                )
                                  ? "border-red-500 text-red-500"
                                  : task.priority === "high"
                                  ? "border-red-500"
                                  : task.priority === "medium"
                                  ? "border-yellow-500"
                                  : "border-green-500"
                              } bg-background p-4 shadow`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {task.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {task.description}
                                  </p>
                                  {task.completed && task.completionNote && (
                                    <p className="text-xs text-green-500 mt-1">
                                      {task.completionNote}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCompleteTask(task.id)}
                                  >
                                    {task.completed ? (
                                      <CheckIcon className="h-5 w-5" />
                                    ) : (
                                      <CircleIcon className="h-5 w-5" />
                                    )}
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                      >
                                        <DotsHorizontalIcon className="h-5 w-5" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleEditTask(task.id, {
                                            priority:
                                              task.priority === "high"
                                                ? "medium"
                                                : task.priority === "medium"
                                                ? "low"
                                                : "high",
                                          })
                                        }
                                      >
                                        {task.priority === "high"
                                          ? "Set Medium Priority"
                                          : task.priority === "medium"
                                          ? "Set Low Priority"
                                          : "Set High Priority"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleEditTask(task.id, {
                                            category:
                                              task.category === "Work"
                                                ? "Personal"
                                                : "Work",
                                          })
                                        }
                                      >
                                        {task.category === "Work"
                                          ? "Move to Personal"
                                          : "Move to Work"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          const newTitle = prompt(
                                            "Enter new task title:"
                                          );
                                          const newDescription = prompt(
                                            "Enter new task description:"
                                          );
                                          handleEditTask(task.id, {
                                            title:
                                              newTitle === null
                                                ? undefined
                                                : newTitle,
                                            description:
                                              newDescription === null
                                                ? undefined
                                                : newDescription,
                                          });
                                        }}
                                      >
                                        Edit Task
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDeleteTask(task.id)
                                        }
                                      >
                                        Delete Task
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>
                                    Due:{" "}
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                {task.completedDate && (
                                  <div className="flex items-center gap-2 text-sm text-green-500">
                                    <CheckIcon className="h-4 w-4" />
                                    <span>
                                      Completed:{" "}
                                      {new Date(
                                        task.completedDate
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                                    task.priority === "high"
                                      ? "bg-red-500 text-red-50"
                                      : task.priority === "medium"
                                      ? "bg-yellow-500 text-yellow-50"
                                      : "bg-green-500 text-green-50"
                                  }`}
                                >
                                  {task.priority}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>

            {/* "Completed Tasks" Section */}
            <div>
              <div className="rounded-lg border border-muted bg-background p-4 shadow">
                <h2 className="mb-4 text-lg font-bold">Completed Tasks</h2>
                <div className="space-y-4">
                  {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-green-500 bg-background p-4 shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium line-through">
                              {task.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                            {task.completed && task.completionNote && (
                              <p className="text-xs text-green-500 mt-1">
                                {task.completionNote}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              <CheckIcon className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full"
                                >
                                  <DotsHorizontalIcon className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  Delete Task
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {/* ... (Your due date and priority display for completed task) ... */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          {task.completedDate && (
                            <div className="flex items-center gap-2 text-sm text-green-500">
                              <CheckIcon className="h-4 w-4" />
                              <span>
                                Completed:{" "}
                                {new Date(
                                  task.completedDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              task.priority === "high"
                                ? "bg-red-500 text-red-50"
                                : task.priority === "medium"
                                ? "bg-yellow-500 text-yellow-50"
                                : "bg-green-500 text-green-50"
                            }`}
                          >
                            {task.priority}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
