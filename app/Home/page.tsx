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
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     setCurrentPage(pathname);
//   }, [pathname]);

//   return (
//     <div className="flex h-screen">
//       {/* Mobile Menu Button */}
//       <div className="fixed bottom-5 left-5 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`fixed top-0 left-0 z-40 w-full h-screen transition-transform duration-300 ease-in-out bg-gray-800 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="flex flex-col items-center w-50 h-full overflow-hidden text-gray-500 bg-gray-800 rounded">
//           <Link
//             className="flex items-center w-full px-3 mt-3"
//             href="/Welcome"
//             onClick={() => {
//               setCurrentPage("/Welcome");
//               setIsMenuOpen(false); // Close the menu after clicking
//             }}
//           >
//             <Package2Icon className="w-8 h-8 fill-current text-blue-500" />
//             <span className="ml-2 text-sm font-bold">Home</span>
//           </Link>

//           <div className="w-full px-2">
//             <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
//               <Link
//                 className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
//                   currentPage === "/Context" ? 'text-gray-200 bg-gray-700' : ''
//                 }`}
//                 href="/Context"
//                 onClick={() => {
//                   setCurrentPage("/Context");
//                   setIsMenuOpen(false); // Close the menu after clicking
//                 }}
//               >
//                 <HomeIcon className="w-6 h-6 stroke-current text-green-500" />
//                 <span className="ml-2 text-sm font-medium">Manager</span>
//               </Link>
//               <Link
//                 className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
//                   currentPage === "/To_Do" ? 'text-gray-200 bg-gray-700' : ''
//                 }`}
//                 href="/To_Do"
//                 onClick={() => {
//                   setCurrentPage("/To_Do");
//                   setIsMenuOpen(false); // Close the menu after clicking
//                 }}
//               >
//                 <CalculatorIcon className="w-6 h-6 stroke-current text-yellow-500" />
//                 <span className="ml-2 text-sm font-medium">To Do Manager</span>
//               </Link>
//               <Link
//                 className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
//                   currentPage === "/Calculator" ? 'text-gray-200 bg-gray-700' : ''
//                 }`}
//                 href="/Calculator"
//                 onClick={() => {
//                   setCurrentPage("/Calculator");
//                   setIsMenuOpen(false); // Close the menu after clicking
//                 }}
//               >
//                 <CalculatorIcon className="w-6 h-6 stroke-current text-purple-500" />
//                 <span className="ml-2 text-sm font-medium">Calculator</span>
//               </Link>
//               <Link
//                 className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
//                   currentPage === "/History" ? 'text-gray-200 bg-gray-700' : ''
//                 }`}
//                 href="/History"
//                 onClick={() => {
//                   setCurrentPage("/History");
//                   setIsMenuOpen(false); // Close the menu after clicking
//                 }}
//               >
//                 <HistoryIcon className="w-6 h-6 stroke-current text-red-500" />
//                 <span className="ml-2 text-sm font-medium">History</span>
//               </Link>
//             </div>
//           </div>
//         </div>
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
import { PencilIcon } from "@/components/icons/PencilIcon";

export default function Frist() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  return (
    <div className="flex h-screen relative">
      <div 
        className="fixed bottom-5 left-5 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-gray-600 text-black cursor-pointer" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      <div 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-500 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-r-lg">
          <Link
            className="flex items-center w-full px-3 mt-3"
            href="/Welcome"
            onClick={() => {
              setCurrentPage("/Welcome");
              setIsMenuOpen(false); // Close the menu after clicking
            }}
          >
            <Package2Icon className="w-8 h-8 fill-current text-white" />
            <span className="ml-2 text-sm font-bold text-white">Home</span>
          </Link>

          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <Link
                className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
                  currentPage === "/Context" ? 'text-white bg-gray-700' : ''
                }`}
                href="/Context"
                onClick={() => {
                  setCurrentPage("/Context");
                  setIsMenuOpen(false); // Close the menu after clicking
                }}
              >
                <HomeIcon className="w-6 h-6 stroke-current text-white" />
                <span className="ml-2 text-sm font-medium text-white">Manager</span>
              </Link>
              <Link
                className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
                  currentPage === "/To_Do" ? 'text-white bg-gray-700' : ''
                }`}
                href="/To_Do"
                onClick={() => {
                  setCurrentPage("/To_Do");
                  setIsMenuOpen(false); // Close the menu after clicking
                }}
              >
                <PencilIcon className="w-6 h-6 stroke-current text-white" />
                <span className="ml-2 text-sm font-medium text-white">To Do Manager</span>
              </Link>
              <Link
                className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
                  currentPage === "/Calculator" ? 'text-white bg-gray-700' : ''
                }`}
                href="/Calculator"
                onClick={() => {
                  setCurrentPage("/Calculator");
                  setIsMenuOpen(false); // Close the menu after clicking
                }}
              >
                <CalculatorIcon className="w-6 h-6 stroke-current text-white" />
                <span className="ml-2 text-sm font-medium text-white">Calculator</span>
              </Link>
              <Link
                className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${
                  currentPage === "/History" ? 'text-white bg-gray-700' : ''
                }`}
                href="/History"
                onClick={() => {
                  setCurrentPage("/History");
                  setIsMenuOpen(false); // Close the menu after clicking
                }}
              >
                <HistoryIcon className="w-6 h-6 stroke-current text-white" />
                <span className="ml-2 text-sm font-medium text-white">History</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}