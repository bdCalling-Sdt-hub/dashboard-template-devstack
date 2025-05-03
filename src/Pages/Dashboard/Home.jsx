import React from "react";
import { FaCalendarDay, FaDollarSign } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdArrowUpward, MdOutlineHome } from "react-icons/md";
import { PiHouseLine } from "react-icons/pi";
import { Bar } from "react-chartjs-2";
import LineChart from "./LineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OrderTable from "../../components/home/OrderTable";
import SalesLeaderBoard from "../../components/home/SalesLeaderBoard";
import HomeCard from "../../components/home/HomeCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const data = {
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
        label: "Subscriptions",
        data: [64, 27, 83, 90, 87, 85, 70, 40, 32, 74, 65, 70],
        backgroundColor: "#3FC7EE",
        borderColor: "#A1A1A1",
        borderWidth: 1,
        barThickness: 24,
        maxBarThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "#A1A1A1",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          suggestedMin: 0,
          suggestedMax: 100,
        },
        grid: {
          display: true,
          lineWidth: 2,
        },
      },
    },
  };

  return (
    <div className="p-2 md:p-4 space-y-4 md:space-y-6">
      {/* Home Card */}
      <div>
        <HomeCard />
      </div>

      {/* Line Chart Section */}
      <div className="w-full">
        <div className="w-full bg-gradient-to-r from-primary to-secondary p-3 md:p-4 lg:p-6 rounded-lg">
          <LineChart />
        </div>
      </div>

      {/* Order Table */}
      <div>
        <OrderTable />
        {/* <SalesLeaderBoard /> */}
      </div>
    </div>
  );
};

export default Home;
