const express = require('express');
const cors = require('cors');
require( 'dotenv' ).config()
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );

const app = express()
const port = process.env.Port || 5000;

// Middelware
app.use( cors() );
app.use( express.json() );


app.get('/', ( req, res ) => {
    res.send( 'the server is running' );
})

app.listen( port, () => {
    console.log( port );
})