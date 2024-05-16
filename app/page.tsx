
// import App from './App';
// import './globals.css';
// export default function Home() {
//   return (
//     <div>
//       <App>

//       </App>
//     </div>
//   );
// }
'use client'
import Link from "next/link";
import { Package2Icon } from "@/components/icons/Package2Icon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { CalculatorIcon } from "@/components/icons/CalculatorIcon";
import { HistoryIcon } from "@/components/icons/HistoryIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import "./globals.css"
import { usePathname } from "next/navigation";
import Context from "./Context/Context";

export default function App() {

  const pathname = usePathname();
  return (
    <div className="flex h-screen"> {/* Use flexbox for layout */}
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-gray-100/40  p-4 sticky top-0 dark:bg-gray-800/40"> {/* Fixed sidebar with sticky */}
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package2Icon className="h-6 w-6" />
            <span className="">Manager</span>
          </Link>
        </div>
        <nav className="grid items-start px-4 text-sm font-medium mt-4">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
            href="/Context"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/Calculator"
          >
            <CalculatorIcon className="h-4 w-4" />
            Calculator
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/History"
          >
            <HistoryIcon className="h-4 w-4" />
            History
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/Settings"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}