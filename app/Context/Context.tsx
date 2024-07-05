"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerClose,
  DrawerFooter,
  DrawerContent,
  Drawer,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { TrashIcon } from "../../components/icons/TrashIcon";
import { useAuth } from "@/components/AuthContext";
import { db } from "@/firebaseConfig";
import Home from "@/app/Home/page";
import "@/app/globals.css"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import CategoryModal from "./CategoryModal";

type Transaction = {
  id?: string;
  name: string;
  description: string;
  amount: number;
  date?: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

// export default function TransactionsPage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

//   const { userEmail } = useAuth();

//   const [newTransaction, setNewTransaction] = useState<Transaction>({
//     name: "",
//     description: "",
//     amount: 0,
//     categoryId: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const handleInputChange = useCallback(
//     (e: any) => {
//       if (e.target.id === "amount") {
//         const parsedAmount = parseFloat(e.target.value);
//         setNewTransaction({
//           ...newTransaction,
//           [e.target.id]: isNaN(parsedAmount) ? 0 : parsedAmount,
//         });
//       } else {
//         setNewTransaction({ ...newTransaction, [e.target.id]: e.target.value });
//       }
//     },
//     [newTransaction]
//   );

//   const handleOpenDrawerForAdding = useCallback(() => {
//     setIsDrawerOpen(true);
//     setIsEditing(false);
//     setEditingIndex(null);
//   }, []);

//   const handleAddTransaction = useCallback(async () => {
//     if (newTransaction.amount !== 0) {
//       try {
//         if (userEmail) {
//           const docRef = await addDoc(
//             collection(db, "users", userEmail, "transactions"),
//             {
//               ...newTransaction,
//               date: serverTimestamp(),
//               categoryId: selectedCategory || "",
//             }
//           );
//           setTransactions([
//             ...transactions,
//             {
//               ...newTransaction,
//               id: docRef.id,
//               date: new Date().toISOString(),
//               categoryId: selectedCategory || "",
//             },
//           ]);
//         }
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     }
//     setNewTransaction({ name: "", description: "", amount: 0, categoryId: "" });
//     setIsDrawerOpen(false);
//     setIsEditing(false);
//     setEditingIndex(null);
//   }, [
//     isEditing,
//     newTransaction,
//     transactions,
//     editingIndex,
//     userEmail,
//     selectedCategory,
//   ]);

//   const handleSaveEditTransaction = async () => {
//     if (editingIndex !== null) {
//       const transactionId = transactions[editingIndex].id;
//       if (!transactionId) {
//         console.error("Transaction ID is undefined");
//         return;
//       }
//       try {
//         if (userEmail) {
//           await setDoc(
//             doc(db, "users", userEmail, "transactions", transactionId),
//             {
//               ...newTransaction,
//               categoryId: selectedCategory || "",
//             }
//           );
//           const updatedTransactions = transactions.map((transaction, index) =>
//             index === editingIndex
//               ? {
//                   ...newTransaction,
//                   id: transactionId,
//                   categoryId: selectedCategory || "",
//                 }
//               : transaction
//           );
//           setTransactions(updatedTransactions);
//         } else {
//           console.error("User is not logged in");
//         }
//       } catch (e) {
//         console.error("Error updating document: ", e);
//       }
//       setEditingIndex(null);
//     }
//     setNewTransaction({ name: "", description: "", amount: 0, categoryId: "" });
//     setIsDrawerOpen(false);
//     setEditingIndex(null);
//   };

//   const handleEditTransaction = useCallback(
//     (index: number) => {
//       const transactionToEdit = transactions[index];
//       setNewTransaction(transactionToEdit);
//       setIsDrawerOpen(true);
//       setIsEditing(true);
//       setEditingIndex(index);
//     },
//     [transactions]
//   );

//   const handleDeleteTransaction = useCallback(
//     async (index: number) => {
//       const transactionId = transactions[index].id;
//       if (!transactionId) {
//         console.error("Transaction ID is undefined");
//         return;
//       }
//       setTransactions(transactions.filter((_, i) => i !== index));
//       try {
//         if (userEmail) {
//           await deleteDoc(
//             doc(db, "users", userEmail, "transactions", transactionId)
//           );
//         }
//       } catch (e) {
//         console.error("Error removing document: ", e);
//       }
//       setIsEditing(false);
//     },
//     [transactions, userEmail]
//   );
//   useEffect(() => {
//     if (userEmail) {
//       const q = query(collection(db, "users", userEmail, "categories"));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const fetchedCategories = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Category[];
//         setCategories(fetchedCategories);
//       });
//       return () => unsubscribe();
//     }
//   }, [userEmail]);

//   useEffect(() => {
//     let q;
//     if (userEmail) {
//       if (selectedCategory) {
//         q = query(
//           collection(db, "users", userEmail, "transactions"),
//           where("categoryId", "==", selectedCategory)
//         );
//       } else {
//         q = query(collection(db, "users", userEmail, "transactions"));
//       }

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         let newTransactions: Transaction[] = [];
//         snapshot.forEach((doc) => {
//           const transactionData = doc.data();
//           const formattedDate = transactionData.date
//             ? new Date(transactionData.date.seconds * 1000).toLocaleDateString()
//             : "";
//           newTransactions.push({
//             id: doc.id,
//             ...transactionData,
//             date: formattedDate, 
//           } as Transaction);
//         });
//         setTransactions(newTransactions);
//       });

//       return () => unsubscribe();
//     }
//   }, [userEmail, selectedCategory]);

//   const handleAddCategory = async (newCategory: string) => {
//     try {
//       if (userEmail) {
//         await addDoc(collection(db, "users", userEmail, "categories"), {
//           name: newCategory,
//         });
//       }
//     } catch (error) {
//       console.error("Error adding category: ", error);
//     }
//   };

//   const handleEditCategory = async (updatedCategory: Category) => {
//     try {
//       if (userEmail && updatedCategory.id) {
//         await setDoc(
//           doc(db, "users", userEmail, "categories", updatedCategory.id),
//           { name: updatedCategory.name }
//         );
//       }
//     } catch (error) {
//       console.error("Error updating category: ", error);
//     }
//   };

//   const handleDeleteCategory = async (categoryId: string) => {
//     try {
//       if (userEmail) {
//         await deleteDoc(doc(db, "users", userEmail, "categories", categoryId));

//         const q = query(
//           collection(db, "users", userEmail, "transactions"),
//           where("categoryId", "==", categoryId)
//         );

//         const snapshot = await getDocs(q);

//         snapshot.forEach(async (doc) => {
//           await updateDoc(doc.ref, { categoryId: "" });
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting category: ", error);
//     }
//   };

//   if (!userEmail) {
//     console.error("User is not logged in");
//     return null;
//   }
//   return (
//     <div className="flex h-screen flex-col sm:flex-row">
//       {/* <Home></Home> */}
//       <div className="flex-grow flex flex-col overflow-hidden">
//         {/* Header for Transactions */}
//         <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-4 sm:px-6 dark:bg-gray-800/40">
//           <div className="flex-1">
//             <span className="font-bold text-lg">Transactions</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <div className="items-center flex flex-1 gap-4 md:ml-auto md:gap-2 lg:gap-4">
//               <div className="items-right flex flex-1 gap-4 md:ml-auto md:gap-2 lg:gap-4">
//                 <Button
//                   className=" ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                   size="sm" // Make button smaller on mobile
//                   onClick={() => setIsCategoryModalOpen(true)}
//                 >
//                   Add Category
//                 </Button>
//               </div>
//               {/* Drawer for adding/editing transactions */}
//               <Drawer open={isDrawerOpen}>
//                 <DrawerTrigger asChild>
//                   <Button
//                     className="ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                     size="sm" // Make button smaller on mobile
//                     onClick={handleOpenDrawerForAdding}
//                   >
//                     Add Transaction
//                   </Button>
//                 </DrawerTrigger>
//                 {/* Drawer Content */}
//                 <DrawerContent>
//                   <DrawerHeader>
//                     <DrawerTitle>
//                       {isEditing ? "Edit Transaction" : "Add Transaction"}
//                     </DrawerTitle>
//                   </DrawerHeader>
//                   <div className="px-4 py-6 space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                           id="name"
//                           placeholder="Enter name"
//                           value={newTransaction.name}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Input
//                           id="description"
//                           placeholder="Enter description"
//                           value={newTransaction.description}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="amount">Total Amount</Label>
//                       <Input
//                         id="amount"
//                         placeholder="Enter amount"
//                         type="number"
//                         value={
//                           newTransaction.amount !== undefined
//                             ? newTransaction.amount
//                             : ""
//                         }
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="category">Category</Label>
//                       <select
//                         id="category"
//                         value={newTransaction.categoryId}
//                         onChange={(e) =>
//                           setNewTransaction({
//                             ...newTransaction,
//                             categoryId: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">Select Category (optional)</option>
//                         {categories.map((category) => (
//                           <option key={category.id} value={category.id}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   {/* Drawer Footer for Save and Cancel buttons */}
//                   <DrawerFooter>
//                     <Button
//                       type="button"
//                       onClick={
//                         isEditing
//                           ? handleSaveEditTransaction
//                           : handleAddTransaction
//                       }
//                     >
//                       {isEditing ? "Update" : "Save"}
//                     </Button>
//                     <DrawerClose asChild>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           setIsDrawerOpen(false);
//                           setEditingIndex(null);
//                           setIsEditing(false);
//                           setNewTransaction({
//                             name: "",
//                             description: "",
//                             amount: 0,
//                             categoryId: "",
//                           });
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </DrawerClose>
//                   </DrawerFooter>
//                 </DrawerContent>
//               </Drawer>
//             </div>
//           </div>
//         </header>
//         <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-4 sm:px-6 dark:bg-gray-800/40">
//           <div className="flex-1">
//             <span className="font-semibold text-lg">Category</span>
//           </div>

//           <div className="flex gap-2 align-middle">
//             <Button
//               className=" ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//               variant="link"
//               onClick={() => setSelectedCategory(null)}
//             >
//               All
//             </Button>
//             {categories.map((category) => (
//               <Button
//                 key={category.id}
//                 variant={
//                   selectedCategory === category.id ? "default" : "outline"
//                 }
//                 onClick={() => setSelectedCategory(category.id)}
//               >
//                 {category.name}
//               </Button>
//             ))}
//           </div>
//         </header>
//         {/* Main Content for Transactions Table */}
//         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 mt-4">
//           <div className="border shadow-sm rounded-lg p-2">
//             <Table >
//               {/* Table Header */}
//               <TableHeader >
//                 <TableRow className="text-gray-900">
//                   <TableHead className="cursor-pointer">
//                     <div className="flex items-center gap-2 text-gray-900">Name</div>
//                   </TableHead>
//                   <TableHead className="cursor-pointer">
//                     <div className="flex items-center gap-2 text-gray-900">
//                       Description
//                     </div>
//                   </TableHead>
//                   <TableHead className="cursor-pointer">
//                     <div className="flex items-center gap-2 text-gray-900">
//                       Total Amount
//                     </div>
//                   </TableHead>
//                   <TableHead className="cursor-pointer">
//                     <div className="flex items-center gap-2 text-gray-900">Category</div>
//                   </TableHead>
//                   <TableHead className="cursor-pointer">
//                     <div className="flex items-center gap-2 text-gray-900">Date</div>
//                   </TableHead>
//                   <TableHead className="w-[80px] text-gray-900">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               {/* Table Body */}
//               <TableBody>
//                 {transactions.length > 0 ? (
//                   transactions.map((transaction, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{transaction.name}</TableCell>
//                       <TableCell>{transaction.description}</TableCell>
//                       <TableCell>{transaction.amount.toFixed(2)}</TableCell>
//                       {selectedCategory === null ? (
//                         <TableCell>
//                           {categories.find(
//                             (category) => category.id === transaction.categoryId
//                           )?.name || "All"}
//                         </TableCell>
//                       ) : (
//                         <TableCell>
//                           {
//                             categories.find(
//                               (category) =>
//                                 category.id === transaction.categoryId
//                             )?.name
//                           }
//                         </TableCell>
//                       )}
//                       <TableCell>{transaction.date}</TableCell>
//                       {/* Actions for each transaction */}
//                       <TableCell className="flex items-center gap-2">
//                         <Button
//                           className="text-blue-500"
//                           size="sm" // Make button smaller on mobile
//                           variant="outline"
//                           onClick={() => handleEditTransaction(index)}
//                         >
//                           {/* Edit Icon */}
//                           <PencilIcon className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           className="text-red-500"
//                           size="sm" // Make button smaller on mobile
//                           variant="outline"
//                           onClick={() => handleDeleteTransaction(index)}
//                         >
//                           {/* Delete Icon */}
//                           <TrashIcon className="w-4 h-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={selectedCategory === null ? 6 : 5}
//                       className="text-center"
//                     >
//                       No transactions. Please add transaction details.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </main>

//         {/* Category Modal */}
//         <CategoryModal
//           isOpen={isCategoryModalOpen}
//           onClose={() => setIsCategoryModalOpen(false)}
//           onAddCategory={handleAddCategory}
//           onEditCategory={handleEditCategory}
//           onDeleteCategory={handleDeleteCategory}
//           categories={categories}
//           editingCategory={editingCategory}
//           setEditingCategory={setEditingCategory}
//         />
//       </div>
//       {/* Home Component */}
//       <Home></Home> 
//     </div>
//   );
// }



export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { userEmail } = useAuth();

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    name: '',
    description: '',
    amount: 0,
    categoryId: '', 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = useCallback(
    (e: any) => {
      if (e.target.id === 'amount') {
        const parsedAmount = parseFloat(e.target.value);
        setNewTransaction({
          ...newTransaction,
          [e.target.id]: isNaN(parsedAmount) ? 0 : parsedAmount,
        });
      } else {
        setNewTransaction({ ...newTransaction, [e.target.id]: e.target.value });
      }
    },
    [newTransaction]
  );

  const handleOpenDrawerForAdding = useCallback(() => {
    setIsDrawerOpen(true);
    setIsEditing(false);
    setEditingIndex(null);
  }, []);

  const handleAddTransaction = useCallback(
    async () => {
      if (newTransaction.amount !== 0) {
        try {
          if (userEmail) {
            const docRef = await addDoc(
              collection(db, 'users', userEmail, 'transactions'),
              {
                ...newTransaction,
                date: serverTimestamp(),
                categoryId: selectedCategory || '',
              }
            );
            setTransactions([
              ...transactions,
              {
                ...newTransaction,
                id: docRef.id,
                date: new Date().toISOString(),
                categoryId: selectedCategory || '', 
              },
            ]);
          }
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
      setNewTransaction({ name: '', description: '', amount: 0, categoryId: '' });
      setIsDrawerOpen(false);
      setIsEditing(false);
      setEditingIndex(null);
    },
    [isEditing, newTransaction, transactions, editingIndex, userEmail, selectedCategory]
  );

  const handleSaveEditTransaction = async () => {
    if (editingIndex !== null) {
      const transactionId = transactions[editingIndex].id;
      if (!transactionId) {
        console.error('Transaction ID is undefined');
        return;
      }
      try {
        if (userEmail) {
          await setDoc(
            doc(db, 'users', userEmail, 'transactions', transactionId),
            {
              ...newTransaction,
              categoryId: selectedCategory || '',
            }
          );
          const updatedTransactions = transactions.map((transaction, index) =>
            index === editingIndex
              ? {
                  ...newTransaction,
                  id: transactionId,
                  categoryId: selectedCategory || '', 
                }
              : transaction
          );
          setTransactions(updatedTransactions);
        } else {
          console.error('User is not logged in');
        }
      } catch (e) {
        console.error('Error updating document: ', e);
      }
      setEditingIndex(null);
    }
    setNewTransaction({ name: '', description: '', amount: 0, categoryId: '' }); 
    setIsDrawerOpen(false);
    setEditingIndex(null);
  };

  const handleEditTransaction = useCallback(
    (index: number) => {
      const transactionToEdit = transactions[index];
      setNewTransaction(transactionToEdit);
      setIsDrawerOpen(true);
      setIsEditing(true);
      setEditingIndex(index);
    },
    [transactions]
  );

  const handleDeleteTransaction = useCallback(
    async (index: number) => {
      const transactionId = transactions[index].id;
      if (!transactionId) {
        console.error('Transaction ID is undefined');
        return;
      }
      setTransactions(transactions.filter((_, i) => i !== index));
      try {
        if (userEmail) {
          await deleteDoc(
            doc(db, 'users', userEmail, 'transactions', transactionId)
          );
        }
      } catch (e) {
        console.error('Error removing document: ', e);
      }
      setIsEditing(false);
    },
    [transactions, userEmail]
  );

  useEffect(() => {
    if (userEmail) {
      const q = query(collection(db, 'users', userEmail, 'categories'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(fetchedCategories);
      });
      return () => unsubscribe();
    }
  }, [userEmail]);

  useEffect(() => {
    let q;
    if (userEmail) {
      if (selectedCategory) {
        q = query(
          collection(db, 'users', userEmail, 'transactions'),
          where('categoryId', '==', selectedCategory)
        );
      } else {
        q = query(collection(db, 'users', userEmail, 'transactions'));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let newTransactions: Transaction[] = [];
        snapshot.forEach((doc) => {
          const transactionData = doc.data();
          const formattedDate = transactionData.date
            ? new Date(transactionData.date.seconds * 1000).toLocaleDateString()
            : ''; 
          newTransactions.push({
            id: doc.id,
            ...transactionData,
            date: formattedDate, 
          } as Transaction);
        });
        setTransactions(newTransactions);
      });

      return () => unsubscribe();
    }
  }, [userEmail, selectedCategory]);

  const handleAddCategory = async (newCategory: string) => {
    try {
      if (userEmail) {
        await addDoc(collection(db, 'users', userEmail, 'categories'), {
          name: newCategory,
        });
      }
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  const handleEditCategory = async (updatedCategory: Category) => {
    try {
      if (userEmail && updatedCategory.id) {
        await setDoc(
          doc(db, 'users', userEmail, 'categories', updatedCategory.id),
          { name: updatedCategory.name }
        );
      }
    } catch (error) {
      console.error('Error updating category: ', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      if (userEmail) {
        await deleteDoc(doc(db, 'users', userEmail, 'categories', categoryId));

        const q = query(
          collection(db, 'users', userEmail, 'transactions'),
          where('categoryId', '==', categoryId)
        );

        const snapshot = await getDocs(q);

        snapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { categoryId: '' }); 
        });
      }
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  if (!userEmail) {
    console.error('User is not logged in');
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between border-b px-4 sm:px-6 py-2 md:py-4 dark:bg-gray-800/40">
        <h2 className="font-bold text-lg md:text-xl">Transactions</h2> 
        <div className="flex items-center gap-2 mt-2 md:mt-0"> 
          <Button
            className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            size="sm"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Add Category
          </Button>
          <Drawer open={isDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                size="sm" 
                onClick={handleOpenDrawerForAdding}
              >
                Add Transaction
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {isEditing ? 'Edit Transaction' : 'Add Transaction'}
                </DrawerTitle>
              </DrawerHeader>
              <div className="px-4 py-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter name"
                      value={newTransaction.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Enter description"
                      value={newTransaction.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="amount">Total Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    type="number"
                    value={newTransaction.amount !== undefined ? newTransaction.amount : ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newTransaction.categoryId}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        categoryId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category (optional)</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DrawerFooter>
                <Button
                  type="button"
                  onClick={isEditing ? handleSaveEditTransaction : handleAddTransaction}
                >
                  {isEditing ? 'Update' : 'Save'}
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setEditingIndex(null);
                      setIsEditing(false);
                      setNewTransaction({
                        name: '',
                        description: '',
                        amount: 0,
                        categoryId: '', 
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 sm:px-6 py-2 border-b dark:bg-gray-800/40">
        <span className="font-semibold text-lg md:block">Category:</span>
        <Button
          className=" ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          variant="link"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div>
        <div className="min-h-full p-4 md:p-6">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-800">
              <TableRow className="text-gray-900">
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-900">Name</div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-900">
                    Description
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-900">
                    Total Amount
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-900">
                    Category
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-900">
                    Date
                  </div>
                </TableHead>
                <TableHead className="w-[80px] text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                    {selectedCategory === null ? ( 
                      <TableCell>
                        {
                          categories.find((category) => category.id === transaction.categoryId)
                            ?.name || 'All' 
                        }
                      </TableCell>
                    ) : (
                      <TableCell>
                        {categories.find((category) => category.id === transaction.categoryId)?.name}
                      </TableCell>
                    )}
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        className="text-blue-500"
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTransaction(index)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        className="text-red-500"
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteTransaction(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={selectedCategory === null ? 6 : 5} className="text-center">
                    No transactions. Please add transaction details.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        categories={categories}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
      <Home></Home> 
    </div>
  );
}