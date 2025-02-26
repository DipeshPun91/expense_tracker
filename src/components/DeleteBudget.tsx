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
import { motion } from "framer-motion";

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg
              className="lucide lucide-trash-2 mr-2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="currentColor"
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
            <p className="text-lg font-semibold">Delete</p>
          </motion.button>
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
