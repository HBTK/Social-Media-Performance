import express from "express";
import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.ASTRA_DB_TOKEN || !process.env.ASTRA_DB_URL) {
  throw new Error(
    "Missing required environment variables: ASTRA_DB_TOKEN or ASTRA_DB_URL"
  );
}

// Initialize the client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

// Create the router
const router = express.Router();

// POST: Add data to the database
router.post("/", async (req, res) => {
  try {
    // Define the table/collection name
    const collectionName = "test04"; // Use the table name (test04)

    // Access the collection (table)
    const collection = db.collection(collectionName);

    // Extract data from the request body
    const { Post_Type, Likes, Shares, Comments, Views } = req.body;

    // Validate input
    if (!Post_Type || Likes == null || Shares == null || Comments == null) {
      return res.status(400).json({
        error: "Missing required fields: Post_Type, Likes, Shares, or Comments",
      });
    }

    // Insert data into the collection
    const post = {
      Post_Type,
      Likes: parseInt(Likes, 10),
      Shares: parseInt(Shares, 10),
      Comments: parseInt(Comments, 10),
      Views: parseInt(Views, 10) || 0, // Default Views to 0 if not provided
    };

    console.log("Inserting data...");
    const inserted = await collection.insertOne(post);

    console.log(`Inserted document ID: ${inserted.documentId}`);
    res.status(201).json({
      message: "Data added successfully",
      documentId: inserted.documentId,
      post,
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding data to the database" });
  }
});

export default router;
