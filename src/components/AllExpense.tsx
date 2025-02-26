"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
}

const AllExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getexpenses");
        if (response.ok) {
          const data: Expense[] = await response.json();
          setExpenses(data);
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-8 h-8 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <motion.tr
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                  {expense.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                  ${expense.amount.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {expenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No expenses found.</p>
        </div>
      )}
    </motion.div>
  );
};

export default AllExpense;
