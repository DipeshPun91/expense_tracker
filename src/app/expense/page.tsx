"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import EditBudget from "@/components/EditBudget";
import DeleteBudget from "@/components/DeleteBudget";
import DeleteExpense from "@/components/DeleteExpense";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-center min-h-screen">
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
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Navigation />
      </div>
      <div className="flex-1 lg:pl-64 sm:pl-0">
        <main className="p-10">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">My Expense</h1>
            <div className="flex items-center gap-4">
              <EditBudget budget={budget} />
              <DeleteBudget budgetId={budget.id} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-900 p-6 rounded-lg flex-1">
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
                <div className="rounded-lg mt-6 overflow-hidden bg-accent w-40 h-40 flex items-center justify-center">
                  <span className="text-7xl leading-none flex items-center justify-center">
                    {budget.emojiIcon}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-300 rounded-full h-5 mt-12">
                <div
                  className="bg-accent h-5 font-medium text-black text-center leading-none rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="ml-1 p-1">{progress.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            <div className="border border-gray-900 p-6 rounded-lg flex-1">
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
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full px-4 py-2 mt-1 bg-primary border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Amount
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full px-4 py-2 mt-1 bg-primary border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <Button
                className="mt-6 w-full lg text-black"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </div>
          </div>

          <div className="border border-gray-900 p-6 mt-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
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
                  <th className="py-2 px-4 bg-accent text-left text-sm font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {budget.expenses?.map((expense, index) => (
                  <tr key={index} className="transition border border-gray-900">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {expense.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      ${expense.amount}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {expense.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-500">
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
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={3} className="text-center text-black py-4">
                      No expenses yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
