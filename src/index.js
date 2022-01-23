const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
// const { render } = require('express/lib/response')
const app = express()
const port = process.env.PORT

app.use(express.static(path.join(__dirname,'public')))

app.listen(port || 5001, () => {
  console.log('Server running...')
})

//HTTP logger
app.use(morgan('combined'))

//Templates engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
console.log('path = ',path.join(__dirname,'resources/views') )
app.set('views', path.join(__dirname,'resources/views'));

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/aboutus', (req, res) => {
  res.render('aboutus')
})

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


app.get('/matchresult', (req, res) => {
  res.render('matchresult')
})


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



