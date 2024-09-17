import express from 'express';
import { promises as fs } from 'fs';

const app = express();
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

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/socks/:color', async (req, res) => {
    try {
        console.log(req);

        console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const data = await fs.readFile('../data/socks.json', 'utf8');

        const jsonObj = JSON.parse(data);
        const { color } = req.params;
        let filteredData = jsonObj.filter(sock => sock.color === color);

        if (filteredData.length <= 0) {
            res.status(404).send(`Unable to find any socks for color: ${color}`);
            return;
        }

        res.json(filteredData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.post('/socks', async (req, res) => {
    try {
        console.log("If POST Malone were a sock, he'd be the onewith the most colorful pattern.");
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).send({ error: 'Username and email are required.' });
        }

        res.status(201).send({
            status: 'success',
            location: `http://localhost:3000/users/${username}`,
            message: 'User created succesfully'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!")
    }
})

app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting socks with ID:', id);
        res.status(200).send('Sock deleted succesfully');
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something doesn\'t smell right... Error deleting sock")
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email,
            message: 'User updated succesfully'
        })
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something doesn\'t smell right... Error deleting sock")
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});