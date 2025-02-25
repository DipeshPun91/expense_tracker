import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "budgets.json");

interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
}

interface Budget {
  id: number;
  name: string;
  amount: number; // Total budget amount
  emojiIcon: string;
  expenses?: Expense[]; // List of expenses
}

export async function GET() {
  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]);
  }

  const fileData = fs.readFileSync(filePath, "utf8");
  const budgets: Budget[] = JSON.parse(fileData);

  const budgetsWithSpending = budgets.map((budget) => {
    const totalSpent = budget.expenses
      ? budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      : 0;

    return {
      ...budget,
      totalSpent,
      expenseCount: budget.expenses ? budget.expenses.length : 0,
    };
  });

  return NextResponse.json(budgetsWithSpending);
}
