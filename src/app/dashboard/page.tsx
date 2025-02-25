"use client";

import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import AllExpense from "@/components/AllExpense";
import CardsData from "@/components/CardsData";
import BarGraph from "@/components/BarGraph";
import { useEffect, useState } from "react";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Navigation />
      </div>
      <div className="flex-1 lg:pl-64 sm:pl-0">
        <main className="p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Hi, There 👋</h1>
            <p className="text-lg text-gray-600">
              Are you having trouble managing your money? Let&apos;s manage your
              expenses.
            </p>
          </div>

          <CardsData />

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-8">
            <div className="flex flex-col col-span-2">
              <div className="p-6 rounded-lg border border-gray-900">
                <h2 className="text-xl font-semibold mb-4 pb-2">Budget</h2>
                <BarGraph />
              </div>
              <AllExpense />
            </div>

            <div className="lg:ml-6">
              <h2 className="text-xl font-semibold mb-4 mt-6 text-gray-700">
                Latest Added Budget
              </h2>
              {budgets.map((budget) => {
                const progress =
                  budget.amount > 0
                    ? Math.min((budget.totalSpent / budget.amount) * 100, 100)
                    : 0;

                return (
                  <div
                    key={budget.id}
                    className="border border-gray-900 p-4 rounded-lg mb-4"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <h1 className="text-lg font-semibold text-gray-700">
                          {budget.name}
                        </h1>
                        <p className="text-sm text-gray-500">
                          Items: {budget.expenseCount}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-black">
                          ${budget.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Spent:{" "}
                          <span className="text-red-500">
                            ${budget.totalSpent}
                          </span>
                        </p>
                      </div>
                      <div className="rounded-lg overflow-hidden bg-accent w-16 h-16 flex items-center justify-center mt-4">
                        <span className="text-3xl">{budget.emojiIcon}</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-300 rounded-full h-5 mt-4">
                      <div
                        className="bg-accent h-5 font-medium text-black text-center leading-none rounded-full"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="ml-1 p-1">{progress.toFixed(0)}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
