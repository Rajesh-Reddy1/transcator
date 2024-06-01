// "use client";
// import { Package2Icon } from "@/components/icons/Package2Icon";
// import { HomeIcon } from "@/components/icons/HomeIcon";
// import { CalculatorIcon } from "@/components/icons/CalculatorIcon";
// import { HistoryIcon } from "@/components/icons/HistoryIcon";

// import "@/app/globals.css";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Frist() {
//   const pathname = usePathname();
//   const [currentPage, setCurrentPage] = useState("");
 

//   useEffect(() => {
//     setCurrentPage(pathname);
//   }, [pathname]);

//   return (
//     <div className="flex h-screen">
//       <div className="flex flex-col w-64 bg-gray-100/40 p-4 sticky top-0 dark:bg-gray-800/40">
//         <div className="flex h-[60px] items-center px-6">
//           <Link
//             className="flex items-center gap-2 font-semibold"
//             href="/Welcome"
//           >
//             <Package2Icon className="h-6 w-6" />
//             <span className=""> Manager</span>
//           </Link>
//         </div>
//         <nav className="grid items-start px-4 text-sm font-medium mt-4">
//           <Link
//             className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
//               currentPage === "/Context"
//                 ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
//                 : "text-gray-500 dark:text-gray-400"
//             } hover:text-gray-900 dark:hover:text-gray-50`}
//             href="/Context"
//           >
//             <HomeIcon className="h-4 w-4" />
//             Home
//           </Link>
//           <Link
//             className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
//               currentPage === "/To_Do"
//                 ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
//                 : "text-gray-500 dark:text-gray-400"
//             } hover:text-gray-900 dark:hover:text-gray-50`}
//             href="/To_Do"
//           >
//             <CalculatorIcon className="h-4 w-4" />
//             To Do Manager
//           </Link>
//           <Link
//             className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
//               currentPage === "/Calculator"
//                 ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
//                 : "text-gray-500 dark:text-gray-400"
//             } hover:text-gray-900 dark:hover:text-gray-50`}
//             href="/Calculator"
//           >
//             <CalculatorIcon className="h-4 w-4" />
//             Calculator
//           </Link>
//           <Link
//             className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
//               currentPage === "/History"
//                 ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
//                 : "text-gray-500 dark:text-gray-400"
//             } hover:text-gray-900 dark:hover:text-gray-50`}
//             href="/History"
//           >
//             <HistoryIcon className="h-4 w-4" />
//             History
//           </Link>
//         </nav>
//       </div>

//       <div className="flex-grow">
      
//       </div>
//     </div>
//   );
// }

"use client";

import { Package2Icon } from "@/components/icons/Package2Icon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { CalculatorIcon } from "@/components/icons/CalculatorIcon";
import { HistoryIcon } from "@/components/icons/HistoryIcon";

import "@/app/globals.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Frist() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  return (
    
    <div className="flex flex-col items-center w-50 h-full overflow-hidden text-gray-500 bg-gray-800 rounded">
      <Link
        className="flex items-center w-full px-3 mt-3"
        href="/Welcome"
        onClick={() => setCurrentPage("/Welcome")}
      >
        <Package2Icon className="w-8 h-8 fill-current" />
        <span className="ml-2 text-sm font-bold">Manager</span>
      </Link>

      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
              currentPage === "/Context" ? 'text-gray-200 bg-gray-700' : ''
            }`}
            href="/Context"
            onClick={() => setCurrentPage("/Context")}
          >
            <HomeIcon className="w-6 h-6 stroke-current" />
            <span className="ml-2 text-sm font-medium">Home</span>
          </Link>
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
              currentPage === "/To_Do" ? 'text-gray-200 bg-gray-700' : ''
            }`}
            href="/To_Do"
            onClick={() => setCurrentPage("/To_Do")}
          >
            <CalculatorIcon className="w-6 h-6 stroke-current" />
            <span className="ml-2 text-sm font-medium">To Do Manager</span>
          </Link>
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
              currentPage === "/Calculator" ? 'text-gray-200 bg-gray-700' : ''
            }`}
            href="/Calculator"
            onClick={() => setCurrentPage("/Calculator")}
          >
            <CalculatorIcon className="w-6 h-6 stroke-current" />
            <span className="ml-2 text-sm font-medium">Calculator</span>
          </Link>
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
              currentPage === "/History" ? 'text-gray-200 bg-gray-700' : ''
            }`}
            href="/History"
            onClick={() => setCurrentPage("/History")}
          >
            <HistoryIcon className="w-6 h-6 stroke-current" />
            <span className="ml-2 text-sm font-medium">History</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
