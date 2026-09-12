import "server-only";
import { MongoClient } from "mongodb";
let connection: Promise<MongoClient> | undefined;
export async function database() {
  if (!process.env.MONGODB_URI) throw new Error("Database not configured");
  if (!connection)
    connection = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 7000,
      maxPoolSize: 10,
    })
      .connect()
      .catch((e) => {
        connection = undefined;
        throw e;
      });
  return (await connection).db(
    process.env.MONGODB_DB_NAME ||
      process.env.MONGODB_DATABASE ||
      "odisha_propack",
  );
}
export async function ensureIndexes() {
  const db = await database();
  await db
    .collection("submissions")
    .createIndex({ formType: 1, createdAt: -1 });
  await db
    .collection("submissions")
    .createIndex({ deliveryComplete: 1, leaseUntil: 1 });
  await db
    .collection("rateLimits")
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}
