import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: 'postgres',
    port: 5432
});

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        console.log(req);

        console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find().toArray();

        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/socks/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        limit = +limit;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find().skip((page - 1) * limit).limit(limit).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

app.post('/socks/search', async (req, res) => {
    try {
        const color = req.body.searchTerm;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({ 'sockDetails.color': color }).toArray();

        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!")
    }
})

app.post('/socks', async (req, res) => {
    try {
        const color = req.body;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const mongoResponse = await collection.insertOne(color);
        const newId = mongoResponse.insertedId.toString();

        res.status(201).send({
            status: 'Created',
            _id: newId
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!")
    }
})

app.post('/socks/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT uid FROM users WHERE username = $1 AND password = $2',
            [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: 'Authentication failed' })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting socks with ID:', id);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const mongoResponse = await collection.deleteOne({ '_id': new ObjectId(id) });
        console.log(mongoResponse);

        res.status(200).send('Sock deleted succesfully');
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something doesn\'t smell right... Error deleting sock")
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});