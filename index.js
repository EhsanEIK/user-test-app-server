const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://userAPPDBUser:PZJ9kM8hnpUdjD1s@cluster0.rwmjrnt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const usersDBCollection = client.db('usersTestDB').collection('users');

        // GET
        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersDBCollection.find(query).toArray();
            res.send(users);
        })

        // POST
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersDBCollection.insertOne(user);
            res.send(result);
        })

        // DELETE
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersDBCollection.deleteOne(query);
            res.send(result);
        })

        // GET [single user by id]
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await usersDBCollection.findOne(query);
            res.send(user);
        })
    }
    finally { }
}
run().catch(err => console.error(err));

app.get('/', async (req, res) => {
    res.send("Welcome to the Server");
});

app.listen(port, () => {
    console.log("Server is running on port:", port);
})