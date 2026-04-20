import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db('wilkyart');
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

// Valid categories for Poletech Trade SL — electronics & computers only
export const VALID_CATEGORIES = ['Server', 'Monitor', 'Laptop', 'Desktop', 'Video Card', 'Router', 'Network Switch', 'Cable', 'Webcam', 'UPS', 'Access Point'] as const;
export type ValidCategory = typeof VALID_CATEGORIES[number];

export const CATEGORY_GROUPS = {
  'Computers & Displays': ['Monitor', 'Laptop', 'Desktop', 'Video Card'],
  'Networking': ['Router', 'Network Switch', 'Cable', 'Access Point'],
  'Infrastructure': ['Server', 'UPS', 'Webcam'],
} as const;