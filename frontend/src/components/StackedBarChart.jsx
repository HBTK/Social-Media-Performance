import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://social-media-performance.onrender.com/fetchData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Group and aggregate the data by Post_Type
        const aggregatedData = data.reduce((acc, curr) => {
          const type = curr.Post_Type;
          if (!acc[type]) {
            acc[type] = { Likes: 0, Shares: 0, Comments: 0 };
          }
          acc[type].Likes += curr.Likes;
          acc[type].Shares += curr.Shares;
          acc[type].Comments += curr.Comments;
          return acc;
        }, {});

        // Prepare the labels and datasets
        const labels = Object.keys(aggregatedData);
        const likes = labels.map((label) => aggregatedData[label].Likes);
        const shares = labels.map((label) => aggregatedData[label].Shares);
        const comments = labels.map((label) => aggregatedData[label].Comments);

        // Update chart data
        setChartData({
          labels,
          datasets: [
            {
              label: "Likes",
              data: likes,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              borderRadius: 5,
            },
            {
              label: "Shares",
              data: shares,
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
              borderRadius: 5,
            },
            {
              label: "Comments",
              data: comments,
              backgroundColor: "rgba(255, 206, 86, 0.5)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Post Engagement Overview",
        font: {
          size: 18,
          family: "Arial, sans-serif",
        },
        color: "#333",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        bodyColor: "#000",
        titleColor: "#000",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        boxPadding: 5,
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
        title: {
          display: true,
          text: "Post Types",
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
        title: {
          display: true,
          text: "Engagement Counts",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 100,
          beginAtZero: true,
          color: "#333",
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className="bargraph-container" style={{ padding: "20px" }}>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p style={{ fontSize: "16px", color: "#666" }}>Loading...</p>
      )}
    </div>
  );
};

export default StackedBarChart;
