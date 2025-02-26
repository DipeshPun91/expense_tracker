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
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
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
