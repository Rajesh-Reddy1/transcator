import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@/components/icons/TrashIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export default function To_DO() {
  return (
    <div key="1" className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <form className="flex items-center mb-6">
            <Input
              className="flex-1 mr-4 bg-white dark:bg-gray-950"
              placeholder="Add a new task..."
              type="text"
            />
            <Button>Add Task</Button>
          </form>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
                  <Checkbox defaultChecked id="task-1" />
                  <label
                    className="ml-2 font-medium line-through text-gray-500 dark:text-gray-400"
                    htmlFor="task-1"
                  >
                    Finish project proposal
                  </label>
                </div>
                <Button size="icon" variant="destructive">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Due date: May 15, 2023
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
                  <Checkbox id="task-2" />
                  <label className="ml-2 font-medium" htmlFor="task-2">
                    Attend team meeting
                  </label>
                </div>
                <Button size="icon" variant="destructive">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Due date: May 17, 2023
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
                  <Checkbox id="task-3" />
                  <label className="ml-2 font-medium" htmlFor="task-3">
                    Review design mockups
                  </label>
                </div>
                <Button size="icon" variant="destructive">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Due date: May 20, 2023
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
