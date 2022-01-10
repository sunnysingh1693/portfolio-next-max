import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    // server-side validation
    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email: email, name: name, message: message
    }

    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.f0dco.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    try {
      client = await MongoClient.connect(connectionString);
      const db = client.db();
      await db.collection('messages').insertOne(newMessage);
      client.close();
    } catch (error) {
      res.status(500).json({ message: error.message })
      return;
    }

    res.status(201).json({ message: 'Message Stored!', data: newMessage })
  }
}