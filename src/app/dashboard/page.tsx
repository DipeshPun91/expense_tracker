"use client";

import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import AllExpense from "@/components/AllExpense";
import CardsData from "@/components/CardsData";
import BarGraph from "@/components/BarGraph";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Budget {
  id: number;
  name: string;
  amount: number;
  emojiIcon: string;
  totalSpent: number;
  expenseCount: number;
}

export default function Dashboard() {
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Are you having trouble managing your money? Let&apos;s manage your
              expenses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <CardsData />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-2"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Budget Overview
                </h2>
                <BarGraph />
              </div>
              <div className="mt-6">
                <AllExpense />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-1"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Latest Added Budget
              </h2>
              {budgets.map((budget) => {
                const progress =
                  budget.amount > 0
                    ? Math.min((budget.totalSpent / budget.amount) * 100, 100)
                    : 0;

                return (
                  <motion.div
                    key={budget.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-purple-400 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{budget.emojiIcon}</span>
                        </div>
                        <div>
                          <h1 className="text-lg font-semibold text-gray-900">
                            {budget.name}
                          </h1>
                          <p className="text-sm text-gray-500">
                            Items: {budget.expenseCount}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${budget.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Spent:{" "}
                          <span className="text-red-500">
                            ${budget.totalSpent}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {progress.toFixed(0)}% spent
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
