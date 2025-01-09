import express from "express";
import dotenv from "dotenv";
import fetchDataRouter from "./routes/fetchData.js"; // Import the fetchData route
import addDataRouter from "./routes/addData.js"; // Import the addData route
import langflowClientRouter from "./routes/langflowClient.js"; // Import the langflowClient route
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// Enable CORS
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use("/fetchData", fetchDataRouter); // Route for fetching data
//localhost:3000/fetchData
app.use("/addData", addDataRouter); // Route for adding data
//localhost:3000/addData
app.use("/langflow_client", langflowClientRouter); // Route for Langflow client
//localhost:3000/langflow_client

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
