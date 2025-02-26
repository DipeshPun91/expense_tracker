"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import EditBudget from "@/components/EditBudget";
import DeleteBudget from "@/components/DeleteBudget";
import DeleteExpense from "@/components/DeleteExpense";

export default function Expense() {
  const searchParams = useSearchParams();
  const budgetId = searchParams.get("id");

  const [budget, setBudget] = useState<{
    id: number;
    name: string;
    amount: number;
    emojiIcon: string;
    expenses?: { id: number; name: string; amount: number; date: string }[];
  } | null>(null);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    if (!budgetId) return;

    const fetchBudget = async () => {
      try {
        const response = await fetch(`/api/onebudget?id=${budgetId}`);
        if (response.ok) {
          const data = await response.json();
          setBudget(data);
        } else {
          console.error("Failed to fetch budget:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    fetchBudget();
  }, [budgetId]);

  const handleAddExpense = async () => {
    if (!expenseName || !expenseAmount || !budget) return;

    try {
      const response = await fetch("/api/addexpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budgetId: Number(budget.id),
          name: expenseName,
          amount: Number(expenseAmount),
        }),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setBudget((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            expenses: [...(prev.expenses || []), newExpense.expense],
          };
        });

        setExpenseName("");
        setExpenseAmount("");
      } else {
        console.error("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  if (!budget)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );

  const totalSpent =
    budget.expenses?.reduce((acc, expense) => acc + expense.amount, 0) || 0;
  const progress =
    budget.amount > 0 ? Math.min((totalSpent / budget.amount) * 100, 100) : 0;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Navigation />
      </div>
      <div className="flex-1 lg:pl-64 sm:pl-0">
        <main className="p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex items-center justify-between"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Expense
            </h1>
            <div className="flex items-center gap-4">
              <EditBudget budget={budget} />
              <DeleteBudget budgetId={budget.id} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-semibold text-gray-800">
                    {budget.name}
                  </h1>
                  <p className="text-2xl mt-5 font-bold text-black">
                    ${budget.amount}
                  </p>
                  <p className="text-sm mt-5 text-gray-500">
                    Number of Items: {budget.expenses?.length || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    Spent: <span className="text-red-500">${totalSpent}</span>
                  </p>
                </div>
                <div className="rounded-lg mt-6 overflow-hidden bg-blue-100 w-40 h-40 flex items-center justify-center">
                  <span className="text-7xl leading-none flex items-center justify-center">
                    {budget.emojiIcon}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 mt-12">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-5 font-medium text-white text-center leading-none rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="ml-1 p-1">{progress.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl transition-shadow duration-300">
              <h1 className="text-xl font-semibold text-gray-800">
                New Expense
              </h1>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Name
                </label>
                <input
                  type="text"
                  value={expenseName}
                  placeholder="e.g., Groceries"
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Amount
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  placeholder="e.g., 500"
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleAddExpense}
              >
                Add Expense
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-10"
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
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {budget.expenses?.map((expense, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                        {expense.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                        ${expense.amount}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                        <DeleteExpense
                          budgetId={budget.id}
                          expenseId={expense.id}
                          onDelete={(expenseId) => {
                            setBudget((prev) => {
                              if (!prev) return null;
                              return {
                                ...prev,
                                expenses:
                                  prev.expenses?.filter(
                                    (exp) => exp.id !== expenseId
                                  ) || [],
                              };
                            });
                          }}
                        />
                      </td>
                    </motion.tr>
                  )) || (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-gray-500 py-4"
                      >
                        No expenses yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
