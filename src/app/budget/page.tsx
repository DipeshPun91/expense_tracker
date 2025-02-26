"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import NewBudget from "@/components/NewBudget";
import Link from "next/link";

interface Budget {
  id: number;
  name: string;
  amount: number;
  emojiIcon: string;
  totalSpent: number;
  expenseCount: number;
}

export default function Budget() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      const response = await fetch("/api/getbudgets");
      if (response.ok) {
        const data: Budget[] = await response.json();
        setBudgets(data);
      }
      setLoading(false);
    };
    fetchBudgets();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Navigation />
      </div>

      <div className="flex-1 lg:pl-64">
        <main className="p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Budget
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage your budgets and track your spending.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NewBudget />
            </motion.div>

            {budgets.map((budget, index) => {
              const progress =
                budget.amount > 0
                  ? Math.min((budget.totalSpent / budget.amount) * 100, 100)
                  : 0;

              return (
                <motion.div
                  key={budget.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`/expense?id=${budget.id}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {budget.name}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            {budget.expenseCount} items
                          </p>
                        </div>

                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center ml-4">
                          <span className="text-3xl">{budget.emojiIcon}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                          <span>Spent: ${budget.totalSpent}</span>
                          <span>Budget: ${budget.amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 text-right">
                          {progress.toFixed(0)}% spent
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
