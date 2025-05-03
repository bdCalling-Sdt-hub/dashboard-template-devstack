import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const LineChart = () => {
  // State to manage the selected year, with 2025 as the default
  const [selectedYear, setSelectedYear] = useState(2025);
  const [chartHeight, setChartHeight] = useState("200px");

  // Effect to update chart height based on screen size
  useEffect(() => {
    const updateChartHeight = () => {
      if (window.innerWidth < 768) {
        setChartHeight("150px");
      } else if (window.innerWidth < 1024) {
        setChartHeight("200px");
      } else {
        setChartHeight("250px");
      }
    };

    // Set initial height
    updateChartHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateChartHeight);

    // Clean up event listener
    return () => window.removeEventListener("resize", updateChartHeight);
  }, []);

  // Data for the line chart
  const allData = {
    2023: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Total Revenue",
          data: [100, 120, 150, 160, 180, 200, 250, 270, 220, 240, 210, 250],
          fill: false,
          borderColor: "#ffffff",
          backgroundColor: "transparent",
          tension: 0.4,
          borderWidth: 2,
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "#ffffff",
          pointRadius: 4,
        },
      ],
    },
    2024: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Total Revenue",
          data: [150, 120, 145, 160, 180, 387, 225, 210, 230, 126, 250, 300],
          fill: false,
          borderColor: "#ffffff",
          backgroundColor: "transparent",
          tension: 0.4,
          borderWidth: 2,
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "#ffffff",
          pointRadius: 4,
        },
      ],
    },
    2025: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Total Revenue",
          data: [200, 180, 210, 250, 300, 400, 350, 320, 310, 290, 330, 400],
          fill: false,
          borderColor: "#ffffff",
          backgroundColor: "transparent",
          tension: 0.4,
          borderWidth: 2,
          pointBorderColor: "#ffffff",
          pointBackgroundColor: "#ffffff",
          pointRadius: 4,
        },
      ],
    },
  };

  // Function to handle the change of selected year
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // Chart options and data based on selected year
  const data = allData[selectedYear];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 2,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 15,
        cornerRadius: 8,
        displayColors: false,
        bodyFont: {
          size: 16,
        },
        boxPadding: 10,
        callbacks: {
          label: (context) =>
            `$${context.raw.toLocaleString()}`.padEnd(15, " "),
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "#ffffff",
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          font: {
            size: (context) => {
              return window.innerWidth < 768 ? 8 : 12;
            },
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: false,
        ticks: {
          color: "#ffffff",
          padding: window.innerWidth < 768 ? 10 : 32,
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
          font: {
            size: (context) => {
              return window.innerWidth < 768 ? 8 : 12;
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Total Revenue
        </h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-primary text-white py-1 sm:py-2 px-3 sm:px-5 rounded-lg"
          style={{ outline: "none" }}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>
      <div
        style={{ width: "100%", height: chartHeight }}
        className="text-white"
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
