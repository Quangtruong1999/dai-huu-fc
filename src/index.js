const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const { engine } = require('express-handlebars');
const {Pool} = require('pg')
const route = require('./routes');
// const { render } = require('express/lib/response')
const app = express()
const port = process.env.PORT

app.use(express.static(path.join(__dirname,'public')))

app.listen(port || 5001, () => {
  console.log('Server running...')
})

//HTTP logger
// app.use(morgan('combined'))

//Templates engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
console.log('path = ',path.join(__dirname,'resources/views') )
app.set('views', path.join(__dirname,'resources/views'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get('/db', (req, res) =>{
  try{
    const client = await pool.connect();
    const result = await client.query('select * from position')
    const results = {
        'results': (result) ? result.rows : null
    }
    client.release();
  } catch (err){
    console.error(err);
    res.send('Error' + err)
  }
  // pool.connect(function(err, client, done){
  //   if(err){
  //       return console.error('error fetching client from pool ', err)
  //   }

  //   client.query('SELECT * FROM position', (err, result) => {
  //       done();
    
  //       if(err){
  //           res.end();
  //           return console.error('error running query ', err)
  //       }
  //       console.log('Data = ', result.rows)
  //       res.render('db', {data: result.rows})
  //   });
  // });
})

route(app);
//router
