const {Client} = require('pg')
const fs = require('fs')
const env = require('dotenv')
const { FALSE } = require('node-sass')
const pg = require('pg')
const { Pool } = require('pg/lib')

env.config({
    path:__dirname + '/.env',
})

// const client = new Client({
//     host: process.env['DATABASE_HOST'],
//     user: process.env['DATABASE_USER'],
//     port: process.env['DATABASE_PORT'],
//     password: process.env['DATABASE_PASSWORD'],
//     database: process.env['DATABASE_NAME'],
//     NODE_TLS_REJECT_UNAUTHORIZED: '0',
//     // ssl: FALSE
//     // ssl: {
//     //     ca: fs.readFileSync(CA_CERT).toString(),
//     // },
// })


// const client = new Client({
//     host: 'localhost',
//     user: 'postgres',
//     port: 5432,
//     password: '3.141592653589',
//     database: 'dai-huu-fc',
// })


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

pool.connect();
// pool.query('select * from position', (err, res) => {
//     if(!err){
//         console.log('rows = ', res.rows);
//     }else{
//         console.log('error : ', err.message);
//     }
// })

// try{
//     const client = await pool.connect();
//     const result = await client.query('select * from position')
//     const results = {
//         'results': (result) ? result.rows : null
//     }

//     client.release();
// }
// catch (err){
//     console.error(err);
//     res.send('Error' + err)
// }

