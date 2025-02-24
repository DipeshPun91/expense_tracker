"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type DeleteExpenseProps = {
  budgetId: number;
  expenseId: number;
  onDelete: (expenseId: number) => void;
};

const DeleteExpense = ({
  budgetId,
  expenseId,
  onDelete,
}: DeleteExpenseProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const handleDeleteExpense = async () => {
    const response = await fetch("/api/deleteexpense", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetId, expenseId }),
    });

    if (response.ok) {
      toast({
        description: "Expense deleted successfully!",
        variant: "success",
      });

      onDelete(expenseId);
      setOpenDialog(false);
    } else {
      toast({
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button>
          <svg
            className="lucide lucide-trash-2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="red"
            fill="none"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line y2="17" y1="11" x2="10" x1="10"></line>
            <line y2="17" y1="11" x2="14" x1="14"></line>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this expense?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The expense will be permanently
            removed.
          </DialogDescription>
          <div className="flex justify-end mt-4">
            <Button onClick={handleDeleteExpense} variant="destructive">
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpense;
