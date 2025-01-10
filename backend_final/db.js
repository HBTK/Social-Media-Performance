import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the Astra DB client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

// Export the database connection
export default db;
