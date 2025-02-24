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
          <Button className="mt-6 w-full lg text-black">
            <svg
              className="w-6 mr-2"
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
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
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
                  type="text"
                  className="w-full px-4 py-2 mt-1 bg-primary border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>

              <Button
                className="mt-4 w-full text-black"
                onClick={handleEditBudget}
              >
                Update Budget
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBudget;
