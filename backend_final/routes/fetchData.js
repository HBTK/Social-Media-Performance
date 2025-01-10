import express from "express";
import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

// Create the router
const router = express.Router();

// GET: Fetch data from the database
router.get("/", async (req, res) => {
  try {
    // Define the table/collection name
    const collectionName = "finaldatabase"; // Use the table name (test04)

    // Get the collection (table) from the keyspace
    const collection = db.collection(collectionName);

    // Query all data from the collection (table)
    console.log("Querying data...");
    const results = await collection.find({}); // Find all documents

    // Collect all documents into an array
    const documents = [];
    for await (const doc of results) {
      documents.push({
        Post_Type: doc.Post_Type,
        Likes: doc.Likes,
        Shares: doc.Shares,
        Comments: doc.Comments,
        Views: doc.Views,
      });
    }

    // Send the documents as a response
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error fetching data from database" });
  }
});

export default router;
