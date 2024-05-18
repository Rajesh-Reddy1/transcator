
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/app/globals.css"

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url('/texture.png')] bg-repeat bg-[length:200px_200px] bg-gray-900">
      <div className="mx-auto max-w-[400px] space-y-6 bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white dark:text-gray-100">Welcome back</h1>
          <p className="text-gray-200 dark:text-gray-400">Enter your email and user ID to sign in.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-200 dark:text-gray-400" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-white/80 dark:bg-gray-800 dark:text-gray-100"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200 dark:text-gray-400" htmlFor="userId">
              User ID
            </Label>
            <Input
              className="bg-white/80 dark:bg-gray-800 dark:text-gray-100"
              id="userId"
              placeholder=".........."
              required
            />
          </div>
          <Button className="w-full bg-white text-purple-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}