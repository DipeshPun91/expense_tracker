"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

type DeleteBudgetProps = {
  budgetId: number;
};

const DeleteBudget = ({ budgetId }: DeleteBudgetProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteBudget = async () => {
    const response = await fetch("/api/deletebudget", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: budgetId }),
    });

    if (response.ok) {
      toast({
        description: "Budget deleted successfully!",
        variant: "success",
      });
      setOpenDialog(false);

      router.push("/budget");
    } else {
      toast({
        description: "Failed to delete budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="mt-6 w-full lg text-black" variant={"destructive"}>
            <svg
              className="w-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              budget?
            </DialogDescription>
            <div className="flex justify-end mt-4">
              <Button onClick={handleDeleteBudget} variant="destructive">
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteBudget;
