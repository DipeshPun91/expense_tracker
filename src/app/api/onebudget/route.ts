import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

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

  const budget = budgets.find(
    (budget: { id: number }) => budget.id === parseInt(id)
  );

  if (!budget) {
    return NextResponse.json({ message: "Budget not found" }, { status: 404 });
  }

  return NextResponse.json(budget);
}
