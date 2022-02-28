const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const { engine } = require('express-handlebars');
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


route(app);
//router
