"use client";
import '@/app/globals.css'
import { useAuth } from "@/components/AuthContext";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface MonthlyTransactionData {
  month: string;
  transactionsCount: number;
  totalAmount: number;
}

export default function History() {
  const { userEmail } = useAuth();
  const [monthlyTransactions, setMonthlyTransactions] =
    useState<MonthlyTransactionData[]>([]);

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      if (!userEmail) {
        return;
      }
      const transactionsRef = collection(db, "users", userEmail, "transactions");
      const monthlyTransactionsData: MonthlyTransactionData[] = [];

      try {
        const querySnapshot = await getDocs(transactionsRef);
        querySnapshot.forEach((doc) => {
          // Get the timestamp from Firestore
          const timestamp = doc.data().dateTime; 

          // Convert the timestamp to a Date object
          const transactionDate = timestamp.toDate(); // Use toDate()

          const month = transactionDate.toLocaleString("default", {
            month: "long",
          });
          const year = transactionDate.getFullYear();

          const existingMonthData = monthlyTransactionsData.find(
            (data) => data.month === `${month} ${year}`
          );

          if (existingMonthData) {
            existingMonthData.transactionsCount++;
            existingMonthData.totalAmount += doc.data().amount;
          } else {
            monthlyTransactionsData.push({
              month: `${month} ${year}`,
              transactionsCount: 1,
              totalAmount: doc.data().amount,
            });
          }
        });
        setMonthlyTransactions(monthlyTransactionsData);
      } catch (error) {
        console.error("Error fetching monthly transactions:", error);
      }
    };
    fetchMonthlyTransactions();
  }, [userEmail]);
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Transactions History</h1>
        <p className="text-gray-500 dark:text-gray-400">Monthly breakdown of your transactions.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Month</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Transactions</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {monthlyTransactions.map((data, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{data.month}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{data.transactionsCount}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">${data.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {monthlyTransactions.length > 0 && (
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Total</td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                  {monthlyTransactions.reduce((total, data) => total + data.transactionsCount, 0)}
                </td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                  ${monthlyTransactions.reduce((total, data) => total + data.totalAmount, 0).toFixed(2)}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
    </div>
  )
}