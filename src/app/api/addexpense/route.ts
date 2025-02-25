import { NextRequest, NextResponse } from "next/server";
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

const saveBudgets = (data: Budget[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export async function POST(req: NextRequest) {
  try {
    const { budgetId, name, amount } = await req.json();
    if (!budgetId || !name || !amount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const budgets = loadBudgets();
    const budgetIndex = budgets.findIndex((b) => b.id === budgetId);

    if (budgetIndex === -1) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
    };

    if (!budgets[budgetIndex].expenses) {
      budgets[budgetIndex].expenses = [];
    }

    budgets[budgetIndex].expenses.push(newExpense);
    saveBudgets(budgets);

    return NextResponse.json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
