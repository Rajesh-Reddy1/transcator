"use client";

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
import { ArrowUpDownIcon } from "@/components/icons/ArrowUpDownIcon";
import { useState } from "react";
type Transaction = {
  name: string;
  description: string;
  amount: number;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    name: "",
    description: "",
    amount: 0,
  });

  const handleInputChange = (e: any) => {
    if (e.target.id === "amount") {
      const parsedAmount = parseFloat(e.target.value);
      setNewTransaction({
        ...newTransaction,
        [e.target.id]: isNaN(parsedAmount) ? 0 : parsedAmount,
      });
    } else {
      setNewTransaction({ ...newTransaction, [e.target.id]: e.target.value });
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleAddTransaction = () => {
    if (newTransaction.amount !== 0) {
      if (isEditing) {
        const updatedTransactions = [...transactions];
        updatedTransactions[editingIndex as number] = newTransaction;
        setTransactions(updatedTransactions);
        setIsEditing(false);
      } else {
        setTransactions([...transactions, newTransaction]);
      }
    }
    setNewTransaction({ name: "", description: "", amount: 0 });
    setIsDrawerOpen(false); // Close the drawer
  };

  const handleEditTransaction = (index: number) => {
    const transactionToEdit = transactions[index];
    setNewTransaction(transactionToEdit);
    setIsDrawerOpen(true); // Open the drawer
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveEditTransaction = () => {
    if (editingIndex !== null) {
      setTransactions(
        transactions.map((transaction, index) =>
          index === editingIndex ? newTransaction : transaction
        )
      );
      setEditingIndex(null);
    }
    setNewTransaction({ name: "", description: "", amount: 0 });
    setIsDrawerOpen(false); // Close the drawer
  };

  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <span className="font-semibold text-lg">Transactions</span>
        </div>
        <div className="items-center flex flex-1 gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Drawer open={isDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                className="ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                size="lg"
                onClick={() => setIsDrawerOpen(true)}
              >
                Add Transaction
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add Transaction</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 py-6 space-y-4 ">
                <div className="grid grid-cols-2 gap-4">
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
                    value={
                      newTransaction.amount !== undefined
                        ? newTransaction.amount
                        : ""
                    } // Check for undefined
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button type="button" onClick={handleAddTransaction}>
                  {isEditing ? "Update" : "Save"}
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
            
          </Drawer>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 mt-4">
        <div className="border shadow-sm rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowUpDownIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDownIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    Total Amount
                    <ArrowUpDownIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {transaction.amount !== 0
                        ? `$${transaction.amount.toFixed(2)}`
                        : ""}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        className="text-blue-500"
                        size="icon"
                        variant="outline"
                        onClick={() => handleEditTransaction(index)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        className="text-red-500"
                        size="icon"
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
                  <TableCell colSpan={4} className="text-center">
                    No transactions. Please add transaction details.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
