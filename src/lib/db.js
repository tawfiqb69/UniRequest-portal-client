import { MongoClient } from "mongodb";
import { DB_NAME } from "./constants";

// Keep one connection on globalThis so hot reload does not open many connections
const globalForMongo = globalThis;

if (!globalForMongo.__uniMongoClient) {
  globalForMongo.__uniMongoClient = new MongoClient(process.env.DB_URI);
}

export const client = globalForMongo.__uniMongoClient;

// The database name comes from inside DB_URI
export const db = client.db(DB_NAME);