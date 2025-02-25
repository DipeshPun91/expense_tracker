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
    const labels: string[] = [];
    const totalAmount: number[] = [];
    const moneySpent: number[] = [];

    budgets.forEach((budget) => {
      labels.push(budget.name);
      totalAmount.push(budget.amount);

      const spentAmount =
        budget.expenses?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0;
      moneySpent.push(spentAmount);
    });

    return NextResponse.json({
      labels,
      datasets: [
        {
          label: "Total Amount",
          data: totalAmount,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Money Spent",
          data: moneySpent,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching bar graph data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
