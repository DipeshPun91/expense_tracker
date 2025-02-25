import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "No budget id provided" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "data", "budgets.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { message: "Budgets file not found" },
      { status: 404 }
    );
  }

  const fileData = fs.readFileSync(filePath, "utf8");
  const budgets = JSON.parse(fileData);

  const index = budgets.findIndex((budget: { id: number }) => budget.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Budget not found" }, { status: 404 });
  }

  const updatedBudgets = budgets.filter(
    (budget: { id: number }) => budget.id !== id
  );

  try {
    fs.writeFileSync(filePath, JSON.stringify(updatedBudgets, null, 2));
    return NextResponse.json(
      { message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json(
      { message: "Failed to delete budget" },
      { status: 500 }
    );
  }
}
