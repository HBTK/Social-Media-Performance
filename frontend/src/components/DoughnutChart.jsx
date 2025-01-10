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
    // Simulate fetching CSV data and calculating engagement rate
    const csvData = [
      { Post_Type: "Story", Likes: 450, Shares: 97, Comments: 41, Views: 609 },
      {
        Post_Type: "Static Image",
        Likes: 451,
        Shares: 87,
        Comments: 23,
        Views: 188,
      },
      {
        Post_Type: "Carousel",
        Likes: 156,
        Shares: 45,
        Comments: 20,
        Views: 673,
      },
      {
        Post_Type: "Carousel",
        Likes: 380,
        Shares: 71,
        Comments: 10,
        Views: 978,
      },
      { Post_Type: "Video", Likes: 108, Shares: 79, Comments: 50, Views: 104 },
    ];

    const rates = calculateEngagementRates(csvData);
    setEngagementRates(rates);
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
