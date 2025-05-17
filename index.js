require( 'dotenv' ).config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );

const app = express()
const port = process.env.PORT || 5000;

// Middelware
app.use( cors() );
app.use( express.json() );

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_USER_PASS }@assignments.vbbuj.mongodb.net/?retryWrites=true&w=majority&appName=assignments`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const database = client.db( 'equi_sports' );
        const productCollection = database.collection( 'products' );

        app.get('/products', async ( req, res ) =>{
            const products = productCollection.find().limit(6);
            const result = await products.toArray();
            // console.log(result);
            res.send( result )
        })

        app.get('/products/:id', async ( req, res ) =>{
            const id = req.params.id;
            const result = await productCollection.findOne({ _id: new ObjectId(id) });
            // console.log(result);
            res.send( result )
        })

        app.delete('/products/:id', async ( req, res ) =>{
            const id = req.params.id;
            const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
            // console.log(result);
            res.send( result )
        })

        // Send a ping to confirm a successful connection
        // await client.db( "admin" ).command({ ping: 1 });
        // console.log( "Pinged your deployment. You successfully connected to MongoDB!" );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch( console.dir );

app.get('/', ( req, res ) => {
    res.send( 'the server is running' );
})

app.listen( port, () => {
    console.log( port );
})