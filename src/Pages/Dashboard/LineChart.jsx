import React, { useState } from "react";
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
    setSelectedYear(event.target.value);
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
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: false,
        ticks: {
          color: "#ffffff",
          padding: 32,
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Total Revenue</h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-primary text-white py-2 px-5 rounded-lg"
          style={{outline:"none" , }}
        >
          
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>
      <div style={{ width: "100%", height: "200px" }} className="text-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
