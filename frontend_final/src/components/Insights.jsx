import React, { useState } from "react";

function GetInsight() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }
    setIsLoading(true);
    const payload = {
      inputValue: question,
      inputType: "chat",
      outputType: "chat",
      stream: false,
    };
    try {
      const res = await fetch(
        "https://social-media-performance-analytics.onrender.com/langflow_client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch insights");
      }
      const data = await res.json();
      const message = data.message || "No message received from the server.";
      setResponse(message);
    } catch (error) {
      console.error("Error fetching insights:", error);
      setResponse("Error fetching insights. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "60%",

        maxWidth: "1500px",
        margin: "0px auto",
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ marginBottom: 10, color: "rgb(49, 47, 47)" }}>
        Get Your Insights
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease",
              backgroundColor: "white",
              color: "#1a202c",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3182ce")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            minWidth: "180px",
            height: "48px",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c5282")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#3182ce")}
        >
          {isLoading ? "Processing..." : "Get Insights"}
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f7fafc",
          padding: "20px",
          borderRadius: "8px",
          border: "2px solid #e2e8f0",
          minHeight: "120px",
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "20px",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            lineHeight: "1.6",
            color: response ? "#2d3748" : "#718096",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {response || "Your insights will appear here..."}
        </p>
      </div>
    </div>
  );
}

export default GetInsight;
