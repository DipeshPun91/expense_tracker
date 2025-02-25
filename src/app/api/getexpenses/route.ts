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
  amount: number;
  emojiIcon: string;
  expenses?: Expense[];
}

const loadBudgets = (): Budget[] => {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData) as Budget[];
  }
  return [];
};

export async function GET() {
  try {
    const budgets = loadBudgets();
    const expenses = budgets.flatMap((budget) => budget.expenses || []);
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
