import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const saveBudgetData = (budgetData: {
  id: number;
  emojiIcon: string;
  name: string;
  amount: number;
}) => {
  const filePath = path.join(process.cwd(), "data", "budgets.json");
  let data = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileData);
  }

  data.push(budgetData);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export async function POST(req: NextRequest) {
  const { id, emojiIcon, name, amount } = await req.json();
  const newBudget = { id, emojiIcon, name, amount };

  saveBudgetData(newBudget);

  return NextResponse.json({ message: "Budget added successfully." });
}
