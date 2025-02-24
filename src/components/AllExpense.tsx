"use client";

import React, { useEffect, useState } from "react";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-6 rounded-lg border border-gray-900">
      <h2 className="text-2xl font-semibold mb-4 pb-2">Expenses</h2>
      <table className="min-w-full border border-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-accent text-left text-sm font-medium text-gray-900">
              Name
            </th>
            <th className="py-2 px-4 bg-accent text-left text-sm font-medium text-gray-900">
              Amount
            </th>
            <th className="py-2 px-4 bg-accent text-left text-sm font-medium text-gray-900">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="transition border border-gray-900">
              <td className="px-4 py-2 text-sm text-gray-700">
                {expense.name}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                ${expense.amount}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {expense.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllExpense;
