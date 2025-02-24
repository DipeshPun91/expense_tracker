import React, { useEffect, useState } from "react";
import Image from "next/image";

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
    { title: "Total Budget", amount: cardData.totalBudget, icon: "Budget.svg" },
    { title: "Money Spent", amount: cardData.moneySpent, icon: "Expense.svg" },
    {
      title: "No. of Budget",
      amount: cardData.totalBudgetsCount,
      icon: "TotalBudget.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-6 rounded-lg flex justify-between items-center border border-gray-900"
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h1>
            <p className="text-2xl mt-4 font-bold">{item.amount}</p>
          </div>
          <div className="rounded-lg overflow-hidden bg-accent w-24 h-24 flex items-center justify-center">
            <Image
              src={`/svg/${item.icon}`}
              alt={item.title}
              width="50"
              height="50"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsData;
