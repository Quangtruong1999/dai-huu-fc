const team_router = require('./teams')
const match_router = require('./matches')
const pg = require('pg')

//Connect db
// var config = {
//     host: 'localhost',
//     user: 'postgres',
//     database: 'dai-huu-fc',
//     password: '3.141592653589',
//     port: 5432,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   };

var connectionString = {
    host: 'ec2-35-153-35-94.compute-1.amazonaws.com',
    user: 'yqxrlacxxfwvzg',
    database: 'd89o6usfr7j3l0',
    password: 'b264645415e9e9a17a0ec303d70e4fb084f9e6af8c1af1a3cb1d8ca4b28c57e1',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
    };
// var pool = new pg.Pool(config)
const pool = new pg.Pool(connectionString);
  

function route(app){
    app.get('/db', (req, res) => {
        pool.on('connect', () => console.log('connected to db'));
        // pool.connect(function(err, client, done){
        //     if(err){
        //         return console.error('error fetching client from pool ', err)
        //     }
      
        //     client.query('SELECT * FROM position', (err, result) => {
        //         done();
            
        //         if(err){
        //             res.end();
        //             return console.error('error running query ', err)
        //         }
        //         console.log('Data = ', result.rows)
        //         res.render('db', {data: result.rows})
        //     });
        // });
    })
      
    app.get('/', (req, res) => {
        res.render('home')
    })
      
    app.get('/aboutus', (req, res) => {
        res.render('aboutus')
    })
    
    app.use('/team', team_router)  

    app.get('/blogdetail', (req, res) => {
        res.render('blogdetail')
    })
      
    app.get('/bloggrid', (req, res) => {
        res.render('bloggrid')
    })
      
    app.get('/bloglist', (req, res) => {
        res.render('bloglist')
    })
      
    app.get('/buyticket', (req, res) => {
        res.render('buyticket')
    })
      
    app.get('/comming-soon', (req, res) => {
        res.render('comming-soon')
    })
      
    app.get('/contactus', (req, res) => {
        res.render('contactus')
    })
      
    app.get('/fixturedetail', (req, res) => {
        res.render('fixturedetail')
    })
      
    app.get('/fixtures', (req, res) => {
        res.render('fixtures')
    })
    
    app.get('/home', (req, res) => {
        res.render('home')
    })
      
      
    app.get('/info%40domain', (req, res) => {
        res.render('info@domain')
    })
      
      
    app.get('/javascript()', (req, res) => {
        res.render('javascript()')
    })
      
      
    app.use('/matchresult', match_router)
      
      
    app.get('/matchresultdetail', (req, res) => {
        res.render('matchresultdetail')
    })
      
      
    app.get('/playerdetail', (req, res) => {
        res.render('playerdetail')
    })
      
      
    app.get('/playergrid-v1', (req, res) => {
        res.render('playergrid-v1')
    })
      
      
    app.get('/playergrid-v2', (req, res) => {
        res.render('playergrid-v2')
    })
      
      
    app.get('/productsingle', (req, res) => {
        res.render('productsingle')
    })
      
      
    app.get('/shopgrid', (req, res) => {
        res.render('shopgrid')
    })
      
      
    app.get('/shoplist', (req, res) => {
        res.render('shoplist')
    })
      
      
    app.get('/soccermedia-1', (req, res) => {
        res.render('soccermedia-1')
    })
      
      
    app.get('/soccermedia-2', (req, res) => {
        res.render('soccermedia-2')
    })
      
    
    app.get('/404', (req, res) => {
        res.render('404')
    })
}

module.exports = route