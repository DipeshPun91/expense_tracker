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

export async function DELETE(req: NextRequest) {
  try {
    const { budgetId, expenseId } = await req.json();
    if (!budgetId || !expenseId) {
      return NextResponse.json(
        { message: "Missing budgetId or expenseId" },
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

    const budget = budgets[budgetIndex];

    if (!budget.expenses || budget.expenses.length === 0) {
      return NextResponse.json(
        { message: "No expenses found for this budget" },
        { status: 404 }
      );
    }

    // Filter out the expense with the matching expenseId
    const updatedExpenses = budget.expenses.filter(
      (expense) => expense.id !== expenseId
    );

    // Update the budget's expenses
    budgets[budgetIndex].expenses = updatedExpenses;

    saveBudgets(budgets);

    return NextResponse.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
