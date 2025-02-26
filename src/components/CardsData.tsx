import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CardsData = () => {
  const [cardData, setCardData] = useState({
    totalBudget: "$0",
    moneySpent: "$0",
    totalBudgetsCount: "0",
  });

  useEffect(() => {
    const fetchCardData = async () => {
      const response = await fetch("/api/getCardsData");
      if (response.ok) {
        const data = await response.json();
        setCardData({
          totalBudget: `$${data.totalBudget}`,
          moneySpent: `$${data.moneySpent}`,
          totalBudgetsCount: data.totalBudgetsCount.toString(),
        });
      }
    };

    fetchCardData();
  }, []);

  const data = [
    {
      title: "Total Budget",
      amount: cardData.totalBudget,
      icon: "Budget.svg",
      bg: "bg-white",
      iconBg: "bg-gradient-to-br from-blue-600 to-blue-400",
    },
    {
      title: "Money Spent",
      amount: cardData.moneySpent,
      icon: "Expense.svg",
      bg: "bg-white",
      iconBg: "bg-gradient-to-br from-red-600 to-red-400",
    },
    {
      title: "Budgets",
      amount: cardData.totalBudgetsCount,
      icon: "TotalBudget.svg",
      bg: "bg-white",
      iconBg: "bg-gradient-to-br from-green-600 to-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${item.bg} border border-gray-200`}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {item.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{item.amount}</p>
            </div>
            <motion.div
              whileHover={{ rotate: 15 }}
              className={`p-4 rounded-lg shadow-lg ${item.iconBg}`}
            >
              <div className="relative w-12 h-12">
                <Image
                  src={`/svg/${item.icon}`}
                  alt={item.title}
                  fill
                  className="filter brightness-0 invert"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardsData;
