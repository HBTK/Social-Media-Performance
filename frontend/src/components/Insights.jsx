import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function GetInsight() {
  // State to manage the question and the response
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  // Handle input change
  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }

    const payload = {
      inputValue: question,
      inputType: "chat",
      outputType: "chat",
      stream: false,
    };

    try {
      const res = await fetch("http://localhost:3000/langflow_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch insights");
      }

      const data = await res.json();

      // Extract the message from the response
      const message = data.message || "No message received from the server.";
      setResponse(message); // Display the message in the response box
    } catch (error) {
      console.error("Error fetching insights:", error);
      setResponse("Error fetching insights. Please try again later.");
    }
  };

  return (
    <div className="insights">
      <div className="select">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter Your Question"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
        <div className="insights-btn">
          <Button
            variant="contained"
            sx={{ width: "200px", height: "50px" }}
            onClick={handleSubmit}
          >
            Get Insights
          </Button>
        </div>
      </div>

      {/* Displaying the response in a text box */}
      <Box
        component="div"
        sx={{
          "& > :not(style)": { m: 1, width: "60ch", height: "100px" },
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          overflow: "auto",
        }}
      >
        <p>{response}</p>
      </Box>
    </div>
  );
}

export default GetInsight;
