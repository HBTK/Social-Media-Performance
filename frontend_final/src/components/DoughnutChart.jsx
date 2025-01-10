import { useState, useEffect } from "react";

export default function DoughnutChart() {
  const [engagementRates, setEngagementRates] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const postTypes = ["Story", "Reels", "Carousel", "Static Image", "Video"];

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(
          "https://social-media-performance-analytics.onrender.com/fetchData"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvData = await response.json(); // Assuming the backend sends JSON data.

        // Calculate engagement rates using the fetched data.
        const rates = calculateEngagementRates(csvData);
        setEngagementRates(rates);
        setIsLoaded(true); // Set isLoaded to true after data is fetched
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message); // Set error state if fetch fails
      }
    };

    fetchCSVData();
  }, []);

  const calculateEngagementRates = (data) => {
    const rates = {};
    data.forEach(({ Post_Type, Likes, Shares, Comments, Views }) => {
      const engagementRate = ((Likes + Shares + Comments) * 100) / Views;
      rates[Post_Type] = parseFloat(engagementRate.toFixed(2));
    });
    return rates;
  };

  const createDonutSegments = () => {
    const total = postTypes.reduce(
      (sum, type) => sum + (engagementRates[type] || 0),
      0
    );
    let currentAngle = 0;
    const segments = [];
    const radius = 100;
    const centerX = 150;
    const centerY = 150;

    postTypes.forEach((type, index) => {
      const value = engagementRates[type] || 0;
      const percentage = (value / total) * 100;
      const angle = (percentage / 100) * 2 * Math.PI;

      const startX = centerX + radius * Math.cos(currentAngle);
      const startY = centerY + radius * Math.sin(currentAngle);
      const endX = centerX + radius * Math.cos(currentAngle + angle);
      const endY = centerY + radius * Math.sin(currentAngle + angle);

      const labelAngle = currentAngle + angle / 2;
      const labelRadius = radius * 0.6; // Adjust this value to fit the label inside
      const labelX = centerX + labelRadius * Math.cos(labelAngle);
      const labelY = centerY + labelRadius * Math.sin(labelAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;
      const animatedRadius = isLoaded ? radius : 0;

      const pathData = `
        M ${centerX} ${centerY}
        L ${centerX + animatedRadius * Math.cos(currentAngle)} ${
        centerY + animatedRadius * Math.sin(currentAngle)
      }
        A ${animatedRadius} ${animatedRadius} 0 ${largeArcFlag} 1 ${
        centerX + animatedRadius * Math.cos(currentAngle + angle)
      } ${centerY + animatedRadius * Math.sin(currentAngle + angle)}
        Z
      `;

      segments.push({
        path: pathData,
        color: colors[index],
        labelX,
        labelY,
        percentage: percentage.toFixed(1),
        type,
        index,
      });

      currentAngle += angle;
    });

    return segments;
  };

  const containerStyle = {
    width: "600px",
    height: "400px",
    backgroundColor: "white",
    padding: "4px",
    borderRadius: "12px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    margin: "0 auto",
  };

  if (!isLoaded) {
    return (
      <div style={containerStyle}>
        <h2>Loading...</h2>
        <div className="loader">Loading...</div> {/* Add a loader here */}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "32px",
          color: "#1f2937",
        }}
      >
        Engagement Rate Distribution
      </h2>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>Error: {error}</div>
      )}{" "}
      {/* Error display */}
      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 300 300" style={{ width: "100%", height: "360px" }}>
          <g transform="translate(0, 20)">
            {createDonutSegments().map((segment, index) => (
              <g
                key={index}
                style={{
                  transform:
                    hoveredSegment === segment.index
                      ? `translate(${
                          Math.cos((index * Math.PI) / 2.5) * 10
                        }px, ${Math.sin((index * Math.PI) / 2.5) * 10}px)`
                      : "translate(0, 0)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <path
                  d={segment.path}
                  fill={segment.color}
                  style={{
                    filter:
                      hoveredSegment === segment.index
                        ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))"
                        : "none",
                    transform: `scale(${
                      hoveredSegment === segment.index ? 1.05 : 1
                    })`,
                    transformOrigin: "150px 150px",
                    transition: "all 0.5s ease-in-out",
                  }}
                  onMouseEnter={() => setHoveredSegment(segment.index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                {parseFloat(segment.percentage) > 5 && (
                  <text
                    x={segment.labelX}
                    y={segment.labelY}
                    textAnchor="middle"
                    fill="white"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      opacity: isLoaded ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    {segment.percentage}%
                  </text>
                )}
              </g>
            ))}
          </g>

          <g transform="translate(0, 1)">
            {createDonutSegments().map((segment, index) => (
              <g
                key={index}
                transform={`translate(${(index % 3) * 100}, ${
                  Math.floor(index / 3) * 25
                })`}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.5s",
                  cursor: "pointer",
                }}
              >
                <rect
                  x="10"
                  y="0"
                  width="15"
                  height="15"
                  fill={segment.color}
                  style={{
                    borderRadius: "2px",
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      hoveredSegment === segment.index
                        ? "scale(1.1)"
                        : "scale(1)",
                  }}
                  onMouseEnter={() => setHoveredSegment(segment.index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                <text
                  x="30"
                  y="12"
                  style={{
                    fontSize: "12px",
                    fill: "currentColor",
                  }}
                >
                  {segment.type}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
