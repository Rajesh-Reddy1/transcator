
// "use client";
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { TrashIcon } from "@/components/icons/TrashIcon";
// import { Calendar } from "@/components/ui/calendar";
// import { Card } from "@/components/ui/card";
// import "@/app/globals.css";
// import { useAuth } from "@/components/AuthContext";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "@/firebaseConfig";
// import Home from "@/app/Home/page";

// interface Task {
//   name: string;
//   dueDate: Date;
//   completed: boolean;
//   priority: string;
//   id: string;
// }

// export default function To_Do() {
//   const { userEmail } = useAuth();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTaskName, setNewTaskName] = useState("");
//   const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(
//     undefined
//   );
//   const [newTaskPriority, setNewTaskPriority] = useState("low");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const calendarRef = useRef<HTMLDivElement>(null); // Reference to calendar element

//   const addTask = useCallback(async () => {
//     if (userEmail) {
//       if (newTaskDueDate && newTaskName.trim() !== "") {
//         const docRef = await addDoc(
//           collection(db, "users", userEmail, "Tasks"),
//           {
//             name: newTaskName,
//             dueDate: newTaskDueDate,
//             completed: false,
//             priority: newTaskPriority,
//           }
//         );
//         setTasks([
//           ...tasks,
//           {
//             name: newTaskName,
//             dueDate: newTaskDueDate,
//             completed: false,
//             priority: newTaskPriority,
//             id: docRef.id,
//           },
//         ]);
//         setNewTaskName("");
//         setNewTaskDueDate(undefined);
//         setNewTaskPriority("low");
//         setShowCalendar(false); // Hide calendar after adding task
//       }
//     } else {
//       console.error("User is not logged in");
//     }
//   }, [newTaskName, newTaskDueDate, newTaskPriority, tasks, userEmail]);

//   const deleteTask = useCallback(
//     async (taskId: string) => {
//       if (userEmail) {
//         await deleteDoc(doc(db, "users", userEmail, "Tasks", taskId));
//         setTasks(tasks.filter((task) => task.id !== taskId));
//       } else {
//         console.error("User is not logged in");
//       }
//     },
//     [tasks, userEmail]
//   );

//   const toggleTaskCompletion = useCallback(
//     async (taskId: string) => {
//       if (userEmail) {
//         const taskRef = doc(db, "users", userEmail, "Tasks", taskId);
//         await updateDoc(taskRef, {
//           completed: !tasks.find((task) => task.id === taskId)!.completed,
//         });
//         setTasks(
//           tasks.map((task) =>
//             task.id === taskId ? { ...task, completed: !task.completed } : task
//           )
//         );
//       } else {
//         console.error("User is not logged in");
//       }
//     },
//     [tasks, userEmail]
//   );

//   const handleOutsideClick = useCallback((event: MouseEvent) => {
//     if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
//       setShowCalendar(false);
//     }
//   }, []);

//   useEffect(() => {
//     // Add event listener for outside click
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       // Remove event listener when component unmounts
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [handleOutsideClick]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (userEmail) {
//         const tasksRef = collection(db, "users", userEmail, "Tasks");
//         const querySnapshot = await getDocs(tasksRef);
//         let fetchedTasks: Task[] = [];
//         querySnapshot.forEach((doc) => {
//           fetchedTasks.push({
//             ...doc.data(),
//             id: doc.id,
//             dueDate: doc.data().dueDate.toDate(),
//           } as Task);
//         });

//         // Sort tasks by completion status and priority
//         fetchedTasks = fetchedTasks.sort((a, b) => {
//           // Sort by completion status first
//           if (a.completed !== b.completed) {
//             return a.completed ? 1 : -1;
//           }

//           // If completion status is the same, sort by priority
//           const priorityOrder = ["high", "medium", "low"];
//           return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
//         });

//         setTasks(fetchedTasks);
//       } else {
//         console.error("User is not logged in");
//       }
//     };
//     fetchTasks();
//   }, [userEmail]);

//   // Separate tasks into completed and uncompleted arrays
//   const completedTasks = tasks.filter((task) => task.completed);
//   const uncompletedTasks = tasks.filter((task) => !task.completed);

//   // Sort uncompleted tasks by priority
//   uncompletedTasks.sort((a, b) => {
//     const priorityOrder = ["high", "medium", "low"];
//     return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
//   });

//   return (
//     <div className="flex h-screen">
//       <Home></Home>
//       <div className="flex-grow">
//         <div key="1" className="flex flex-col min-h-screen">
//           <header className="bg-gray-900 text-white py-4 px-6 rounded-xl ">
//             <h1 className="text-2xl font-bold">Todo App</h1>
//           </header>
//           <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
//             <div className="max-w-4xl mx-auto">
//               {/* Add Task Form */}
//               <form
//                 className="flex flex-col mb-6" // Use flex-col for vertical layout on mobile
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   addTask();
//                 }}
//               >
//                 <Input
//                   className="mb-4 bg-white dark:bg-gray-950" // Add margin to inputs
//                   placeholder="Add a new task..."
//                   type="text"
//                   value={newTaskName}
//                   onChange={(e) => setNewTaskName(e.target.value)}
//                 />
//                 <div className="relative mb-4">
//                   <Input
//                     className="bg-white dark:bg-gray-950"
//                     placeholder="Pick a date..."
//                     type="text"
//                     value={
//                       newTaskDueDate ? newTaskDueDate.toLocaleDateString() : ""
//                     }
//                     onFocus={() => setShowCalendar(true)} // Show calendar on focus
//                     readOnly
//                   />
//                   {showCalendar && ( // Conditional rendering of calendar
//                     <div
//                       className="absolute z-10 bg-white rounded-md shadow-md p-2"
//                       ref={calendarRef} // Add ref to calendar container
//                     >
//                       <Calendar
//                         mode="single"
//                         selected={newTaskDueDate}
//                         onSelect={(date) => {
//                           setNewTaskDueDate(date);
//                           setShowCalendar(false); // Hide calendar after selection
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <select
//                   className="mb-4" // Add margin to select
//                   value={newTaskPriority}
//                   onChange={(e) => setNewTaskPriority(e.target.value)}
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//                 <Button type="submit">Add Task</Button>
//               </form>

//               {/* Task Lists */}
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> {/* Adjust columns based on screen size */}
//                 {/* Uncompleted Tasks */}
//                 <div>
//                   <h2 className="text-lg font-medium mb-2">
//                     Uncompleted Tasks
//                   </h2>
//                   <div className="grid grid-cols-1 gap-4">
//                     {uncompletedTasks.map((task, index) => (
//                       <Card key={task.id} className="bg-white dark:bg-gray-950 p-4">
//                         <div className="flex items-center mb-2 justify-between">
//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`task-${task.id}`}
//                               checked={task.completed}
//                               onChange={() => toggleTaskCompletion(task.id)}
//                             />
//                             <label
//                               className={`ml-2 font-medium ${
//                                 task.completed
//                                   ? "line-through text-gray-500 dark:text-gray-400"
//                                   : ""
//                               }`}
//                               htmlFor={`task-${task.id}`}
//                             >
//                               {task.name}
//                             </label>
//                           </div>
//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             onClick={() => deleteTask(task.id)}
//                           >
//                             <TrashIcon className="h-4 w-4" />
//                             <span className="sr-only">Delete task</span>
//                           </Button>
//                         </div>
//                         <p className="text-gray-500 dark:text-gray-400 text-sm">
//                           Due date:{" "}
//                           {task.dueDate
//                             ? task.dueDate.toLocaleDateString() // Now task.dueDate is a Date object
//                             : "N/A"}
//                         </p>
//                         <p className="text-gray-500 dark:text-gray-400 text-sm">
//                           Priority: {task.priority}
//                         </p>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Completed Tasks */}
//                 <div>
//                   <h2 className="text-lg font-medium mb-2">Completed Tasks</h2>
//                   <div className="grid grid-cols-1 gap-4">
//                     {completedTasks.map((task, index) => (
//                       <Card key={task.id} className="bg-white dark:bg-gray-950 p-4">
//                         <div className="flex items-center mb-2 justify-between">
//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`task-${task.id}`}
//                               checked={task.completed}
//                               onChange={() => toggleTaskCompletion(task.id)}
//                             />
//                             <label
//                               className={`ml-2 font-medium line-through text-gray-500 dark:text-gray-400`}
//                               htmlFor={`task-${task.id}`}
//                             >
//                               {task.name}
//                             </label>
//                           </div>
//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             onClick={() => deleteTask(task.id)}
//                           >
//                             <TrashIcon className="h-4 w-4" />
//                             <span className="sr-only">Delete task</span>
//                           </Button>
//                         </div>
//                         <p className="text-gray-500 dark:text-gray-400 text-sm">
//                           Due date:{" "}
//                           {task.dueDate
//                             ? task.dueDate.toLocaleDateString() // Now task.dueDate is a Date object
//                             : "N/A"}
//                         </p>
//                         <p className="text-gray-500 dark:text-gray-400 text-sm">
//                           Priority: {task.priority}
//                         </p>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
    
//   );
// }

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import "@/app/globals.css";
import { useAuth } from "@/components/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Home from "@/app/Home/page";

interface Task {
  name: string;
  dueDate: Date;
  completed: boolean;
  priority: string;
  id: string;
}

export default function To_Do() {
  const { userEmail } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(
    undefined
  );
  const [newTaskPriority, setNewTaskPriority] = useState("low");
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const addTask = useCallback(async () => {
    if (userEmail) {
      if (newTaskDueDate && newTaskName.trim() !== "") {
        const docRef = await addDoc(
          collection(db, "users", userEmail, "Tasks"),
          {
            name: newTaskName,
            dueDate: newTaskDueDate,
            completed: false,
            priority: newTaskPriority,
          }
        );
        setTasks([
          ...tasks,
          {
            name: newTaskName,
            dueDate: newTaskDueDate,
            completed: false,
            priority: newTaskPriority,
            id: docRef.id,
          },
        ]);
        setNewTaskName("");
        setNewTaskDueDate(undefined);
        setNewTaskPriority("low");
        setShowCalendar(false); 
      }
    } else {
      console.error("User is not logged in");
    }
  }, [newTaskName, newTaskDueDate, newTaskPriority, tasks, userEmail]);

  const deleteTask = useCallback(
    async (taskId: string) => {
      if (userEmail) {
        await deleteDoc(doc(db, "users", userEmail, "Tasks", taskId));
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        console.error("User is not logged in");
      }
    },
    [tasks, userEmail]
  );

  const toggleTaskCompletion = useCallback(
    async (taskId: string) => {
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
    },
    [tasks, userEmail]
  );

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userEmail) {
        const tasksRef = collection(db, "users", userEmail, "Tasks");
        const querySnapshot = await getDocs(tasksRef);
        let fetchedTasks: Task[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push({
            ...doc.data(),
            id: doc.id,
            dueDate: doc.data().dueDate.toDate(),
          } as Task);
        });
        fetchedTasks = fetchedTasks.sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          const priorityOrder = ["high", "medium", "low"];
          return (
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
          );
        });

        setTasks(fetchedTasks);
      } else {
        console.error("User is not logged in");
      }
    };
    fetchTasks();
  }, [userEmail]);

  const completedTasks = tasks.filter((task) => task.completed);
  const uncompletedTasks = tasks.filter((task) => !task.completed);

  // Sort uncompleted tasks by priority
  uncompletedTasks.sort((a, b) => {
    const priorityOrder = ["high", "medium", "low"];
    return (
      priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    );
  });

  return (
    <div className="flex h-screen">
      
      <div className="flex-grow flex flex-col">
        <header className="bg-gray-900 text-white py-4 px-6 rounded-t-xl">
          <h1 className="text-2xl font-bold">Todo App</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl w-full mx-auto">
            <form
              className="flex flex-col mb-6"
              onSubmit={(e) => {
                e.preventDefault();
                addTask();
              }}
            >
              <Input
                className="mb-4 bg-white dark:bg-gray-950"
                placeholder="Add a new task..."
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
              <div className="relative mb-4">
                <Input
                  className="bg-white dark:bg-gray-950"
                  placeholder="Pick a date..."
                  type="text"
                  value={
                    newTaskDueDate ? newTaskDueDate.toLocaleDateString() : ""
                  }
                  onFocus={() => setShowCalendar(true)}
                  readOnly
                />
                {showCalendar && (
                  <div
                    className="absolute z-10 bg-white rounded-md shadow-md p-2"
                    ref={calendarRef}
                  >
                    <Calendar
                      mode="single"
                      selected={newTaskDueDate}
                      onSelect={(date) => {
                        setNewTaskDueDate(date);
                        setShowCalendar(false); 
                      }}
                    />
                  </div>
                )}
              </div>
              <select
                className="mb-4" 
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <Button type="submit">Add Task</Button>
            </form>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium mb-2">
                  Uncompleted Tasks
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {uncompletedTasks.map((task, index) => (
                    <Card
                      key={task.id}
                      className="bg-white dark:bg-gray-950 p-4"
                    >
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
                          ? task.dueDate.toLocaleDateString() 
                          : "N/A"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Priority: {task.priority}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">
                  Completed Tasks
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {completedTasks.map((task, index) => (
                    <Card
                      key={task.id}
                      className="bg-white dark:bg-gray-950 p-4"
                    >
                      <div className="flex items-center mb-2 justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                          />
                          <label
                            className={`ml-2 font-medium line-through text-gray-500 dark:text-gray-400`}
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
                          ? task.dueDate.toLocaleDateString() 
                          : "N/A"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Priority: {task.priority}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Home />
    </div>
  );
}