import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [engagementRates, setEngagementRates] = useState({});
  const [postTypes, setPostTypes] = useState([
    "Story",
    "Reels",
    "Carousel",
    "Static Image",
    "Video",
  ]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(
          "https://social-media-performance.onrender.com/fetchData"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvData = await response.json(); // Assuming the backend sends JSON data.

        // Calculate engagement rates using the fetched data.
        const rates = calculateEngagementRates(csvData);
        setEngagementRates(rates);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchCSVData();
  }, []);

  const calculateEngagementRates = (data) => {
    const engagementRates = {};

    data.forEach(({ Post_Type, Likes, Shares, Comments, Views }) => {
      const engagementRate = ((Likes + Shares + Comments) * 100) / Views;
      engagementRates[Post_Type] = engagementRate.toFixed(2);
    });

    return engagementRates;
  };

  const chartData = {
    labels: postTypes,
    datasets: [
      {
        data: postTypes.map((type) => engagementRates[type] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
