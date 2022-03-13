const {Client} = require('pg')
const fs = require('fs')
const env = require('dotenv')
const { FALSE } = require('node-sass')
const pg = require('pg')
const { Pool } = require('pg/lib')

env.config()


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
})

pool.connect(function(err, client, done){
    if(err){
        return console.error('error fetching client from pool ', err)
    }
    client.query('SELECT * FROM position', (err, result) => {
        done();
            
        if(err){
            res.end();
            return console.error('error running query ', err)
        }
        console.log('Data = ', result.rows);
    });
});