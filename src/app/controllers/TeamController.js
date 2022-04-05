const {Pool} = require('pg');
const env = require('dotenv');
const moment = require('moment');
env.config({
    path:'./.env'
})
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

class TeamController{

    index(req, res){
        
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            // console.log('connected')
            // return res.send('connected')
            client.query('SELECT * FROM players', (err, result) => {
                done()
            
                if(err){
                    res.end()
                    return console.error('error running query ', err)
                }
                player = result.rows
                // data['staff'] = result.rows
                
                res.render('playergrid-v1', {players: result.rows})
                // res.render('shop11', {data: product_list})
            });
                
        });
    }

    
}


module.exports = new TeamController;