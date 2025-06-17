import { MongoClient } from "npm:mongodb@^6.15.0";

export type UserDB = {
  _id?: string;
  username: string;
  password: string;
};

let client: MongoClient | null = null;
let isConnecting = false;

async function getClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }
  
  if (isConnecting) {
    // Esperar hasta que la conexión termine
    while (isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return client!;
  }
  
  isConnecting = true;
  
  try {
    client = new MongoClient(
      "mongodb+srv://rodrigof:1234567890r@cluster0.nfitopq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

async function getUsersCollection() {
  const mongoClient = await getClient();
  const db = mongoClient.db("auth_app");
  return db.collection<UserDB>("users");
}

// Exportar funciones helper en lugar de la colección directamente
export const UsersCollection = {
  async findOne(filter: Partial<UserDB>) {
    const collection = await getUsersCollection();
    return await collection.findOne(filter);
  },
  
  async insertOne(doc: Omit<UserDB, '_id'>) {
    const collection = await getUsersCollection();
    return await collection.insertOne(doc);
  },
  
  async find(filter: Partial<UserDB> = {}) {
    const collection = await getUsersCollection();
    return await collection.find(filter).toArray();
  }
};

export default UsersCollection;
