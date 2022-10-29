const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xkmwi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(uri);

async function run (){
    try{
        await client.connect();
        const database = client.db('sozib');
        const postCollection = database.collection('createpost');


        // Get API
        app.get('/createpost', async(req, res) =>{
            const cursor = postCollection.find({});
            const createpost = await cursor.toArray();
            res.send(createpost);
        })

        // post api
        app.post('/createpost', async(req, res) =>{
            const addpost = req.body;
            console.log('hit the post api', addpost);

            const result = await postCollection.insertOne(addpost);
            console.log(result);

            res.json(result)
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('sozib server is running');
});

app.listen(port, () =>{
    console.log('server running at port', port);
});