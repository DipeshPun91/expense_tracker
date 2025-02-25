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
  emojiIcon: string;
  name: string;
  amount: number;
  expenses?: Expense[];
}

const loadBudgets = (): Budget[] => {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  }
  return [];
};

export async function GET() {
  try {
    const budgets = loadBudgets();

    const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);

    const totalSpent = budgets.reduce((acc, budget) => {
      if (budget.expenses) {
        const expensesTotal = budget.expenses.reduce(
          (expenseAcc, expense) => expenseAcc + expense.amount,
          0
        );
        return acc + expensesTotal;
      }
      return acc;
    }, 0);

    const totalBudgetsCount = budgets.length;

    return NextResponse.json({
      totalBudget,
      moneySpent: totalSpent,
      totalBudgetsCount,
    });
  } catch (error) {
    console.error("Error fetching amounts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
