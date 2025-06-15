import { MongoClient } from "npm:mongodb@^6.15.0";

export type UserDB = {
  _id?: string;
  username: string;
  password: string;
};

const client = new MongoClient("mongodb+srv://rodrigof:1234567890r@cluster0.nfitopq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
await client.connect();

const db = client.db("auth_app");
const UsersCollection = db.collection<UserDB>("users");

export default UsersCollection;