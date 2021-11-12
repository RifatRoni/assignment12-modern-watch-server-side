const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//middleware 8.2

app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aysae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; //7

//checking uri
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

    try {

        await client.connect();
        console.log('connected to database')
        const database = client.db('modernWatchShop');
        const servicesCollection = database.collection('products');


        //GET API
        app.get('/products', async(req, res) => {
            const cursor = servicesCollection.find({})
            const products = await cursor.toArray();
            res.send(products);
        });

 
        //GET Single Service
/*         app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id)
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        }) */

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

 


app.get('/', (req, res) => { 
    res.send('Running watch Server');

});
app.listen(port, () => { 
    console.log('Running watch Server on port', port);
})