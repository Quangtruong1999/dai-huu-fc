const team_router = require('./teams')
const match_router = require('./matches')
const {Pool} = require('pg')
const {migrate} = require('postgres-migrations')
const env = require('dotenv');
const { Sequelize } = require('sequelize');


env.config({
    path:'./.env'
})

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

async function route(app){


    app.get('/db', (req, res) => {
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
                console.log('Data = ', result.rows)
                res.render('db', {data: result.rows})
            });
        });
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