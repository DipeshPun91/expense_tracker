"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarGraphData = async () => {
      try {
        const res = await fetch("/api/getbargraph");
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching bar graph data:", error);
      }
    };

    fetchBarGraphData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarGraph;
