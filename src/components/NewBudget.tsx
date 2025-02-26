"use client";

import React, { useState } from "react";
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

const NewBudget = () => {
  const [emojiIcon, setEmojiIcon] = useState("💲");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { toast } = useToast();

  const handleAddBudget = async () => {
    if (!budgetName || !budgetAmount) {
      toast({
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newBudget = {
      id: Date.now(),
      emojiIcon,
      name: budgetName,
      amount: parseFloat(budgetAmount),
    };

    const response = await fetch("/api/addbudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBudget),
    });

    if (response.ok) {
      toast({ description: "Budget added successfully!", variant: "success" });
      setOpenDialog(false);
      setBudgetName("");
      setBudgetAmount("");
    } else {
      toast({
        description: "Failed to add budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 cursor-pointer flex flex-col items-center justify-center h-[200px]"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
              >
                <path
                  d="M12 6V18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">
              New Budget
            </p>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Create New Budget
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
              onClick={handleAddBudget}
              className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Add Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewBudget;
