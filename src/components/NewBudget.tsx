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

const NewBudget = () => {
  const [emojiIcon, setEmojiIcon] = useState("💲");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { toast } = useToast();

  const handleAddBudget = async () => {
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
          <div
            className="border border-gray-900 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent-dark transition-colors"
            onClick={() => setOpenDialog(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
            >
              <rect width="24" height="24" fill="transparent"></rect>
              <path
                d="M12 6V18"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M6 12H18"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <p className="mt-4 text-lg font-semibold text-black">New Budget</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Budget</DialogTitle>
            <div className="mt-5">
              <Button
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="w-full"
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Budget Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 bg-primary border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Budget Amount
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 mt-1 bg-primary border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>

              <Button
                className="mt-4 w-full text-black"
                onClick={handleAddBudget}
              >
                Add Budget
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewBudget;
