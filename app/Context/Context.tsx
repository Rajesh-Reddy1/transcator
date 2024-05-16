"use client";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
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

export default function TransactionsPage() {
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <span className="font-semibold text-lg">Transactions</span>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              
              <Button
                className="ml-auto bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                size="lg"
              >
                Add Transaction
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add Transaction</DrawerTitle>
                <p>1234</p>
              </DrawerHeader>
              <div className="px-4 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter name" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Enter description" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="amount">Total Amount</Label>
                  <Input id="amount" placeholder="Enter amount" type="number" />
                </div>
              </div>
              <DrawerFooter>
                <Button type="submit">Save</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
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
              <TableRow>
                <TableCell>Rent Payment</TableCell>
                <TableCell>Monthly rent for apartment</TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    className="text-blue-500"
                    size="icon"
                    variant="outline"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    className="text-red-500"
                    size="icon"
                    variant="outline"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
