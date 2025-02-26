"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type EditBudgetProps = {
  budget: {
    id: number;
    name: string;
    amount: number;
    emojiIcon: string;
  } | null;
};

const EditBudget = ({ budget }: EditBudgetProps) => {
  const [emojiIcon, setEmojiIcon] = useState("💲");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (budget) {
      setEmojiIcon(budget.emojiIcon);
      setBudgetName(budget.name);
      setBudgetAmount(budget.amount.toString());
    }
  }, [budget]);

  const handleEditBudget = async () => {
    if (!budget) return;

    const updatedBudget = {
      ...budget,
      emojiIcon,
      name: budgetName,
      amount: parseFloat(budgetAmount),
    };

    const response = await fetch(`/api/editbudget/${budget.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBudget),
    });

    if (response.ok) {
      toast({
        description: "Budget updated successfully!",
        variant: "success",
      });
      setOpenDialog(false);
    } else {
      toast({
        description: "Failed to update budget. Please try again.",
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
            className="flex items-center bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
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
            <p className="text-lg font-semibold">Edit</p>
          </motion.button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Edit Budget
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="w-full h-14 text-2xl bg-gray-50 hover:bg-gray-100"
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-10 mt-2">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g., Groceries"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Amount
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g., 500"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={handleEditBudget}
              className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Update Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBudget;
