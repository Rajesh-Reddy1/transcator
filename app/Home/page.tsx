'use client'
import { Package2Icon } from "@/components/icons/Package2Icon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { CalculatorIcon } from "@/components/icons/CalculatorIcon";
import { HistoryIcon } from "@/components/icons/HistoryIcon";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '@/app/globals.css'

import Home from '../Context/Context';
import Calculator from '../Calculator/Calculator';
import History from '../History/page';
import Welcome from "../Welcome/page";
import To_DOPage from "../To_Do/page";



  export default function Frist() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex flex-col w-64 bg-gray-100/40 p-4 sticky top-0 dark:bg-gray-800/40">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" to="/">
              <Package2Icon className="h-6 w-6" />
              <span className="">Manager</span>
            </Link>
          </div>
          <nav className="grid items-start px-4 text-sm font-medium mt-4">
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50" to="/Context">
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/To_DO">
              <CalculatorIcon className="h-4 w-4" />
              To Do Manager
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/Calculator">
              <CalculatorIcon className="h-4 w-4" />
              Calculator
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/History">
              <HistoryIcon className="h-4 w-4" />
              History
            </Link>
          </nav>
        </div>
        
        
        <div className="flex-grow">
          <Routes>
          <Route path="/" element={<Welcome />} />
            <Route path="/Context" element={<Home />} />
            <Route path="/To_do" element={<To_DOPage />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/History" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
