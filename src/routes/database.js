const {Pool} = require('pg')
const {migrate} = require('postgres-migrations')
const env = require('dotenv');

env.config({
    path:'./.env'
})

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

pool.connect(function(err, client, done){
    if (err) throw err;
    console.log('connected!')
});


module.exports = pool