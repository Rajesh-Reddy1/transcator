
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DrawerTrigger, DrawerTitle, DrawerHeader, DrawerClose, DrawerFooter, DrawerContent, Drawer } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Package2Icon } from "./icons/Package2Icon"
import { HomeIcon } from "./icons/HomeIcon"
import { CalculatorIcon } from "./icons/CalculatorIcon"
import { HistoryIcon } from "./icons/HistoryIcon"
import { SettingsIcon } from "./icons/SettingsIcon"
import { ArrowUpDownIcon } from "./icons/ArrowUpDownIcon"
import { TrashIcon } from "./icons/TrashIcon"

export function Components() {
  return (
    <div key="1" className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Manager</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <CalculatorIcon className="h-4 w-4" />
                Calculator
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <HistoryIcon className="h-4 w-4" />
                History
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Transactions</h1>
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
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
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
                  <TableCell>
                    <Button className="text-red-500" size="icon" variant="outline">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}







