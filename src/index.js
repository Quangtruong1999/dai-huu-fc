const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const { engine } = require('express-handlebars');
// const pool = require('./routes/database');
const {Pool} = require('pg')
const route = require('./routes');
const env = require('dotenv');
const bcrypt = require("bcrypt");
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const app = express()
const port = process.env.PORT

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(session({
  secret: 'secrect',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(express.static(path.join(__dirname,'public')))

app.listen(port || 5002, () => {
  console.log('Server running...')
})

//HTTP logger
// app.use(morgan('combined'))

// //Templates engine
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// console.log('path = ',path.join(__dirname,'resources/views') )
// app.set('views', path.join(__dirname,'resources/views'));

//Config ejs
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'resources/views'));

env.config({
  path:'./.env'
})

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
    }
})

app.get('/signup', (req, res) => {
  res.render('signup');
})  

app.post('/signup',urlencodedParser, async (req, res) => {
  let {name, email, password, repassword} = req.body;
  console.log('name = ', name);
  console.log('email = ', email);
  console.log('password = ', password);
  console.log('repass = ',repassword);

  let errors = []
  let success = []
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  if (regex.test(email) != true){
      errors.push({message: "Email invalid!"})
  }
  if (password.length < 6){
      errors.push({ message: "Password should be at least 6 characters"});
  }
  if (password != repassword){
      errors.push({ message: "Password do not match!"});
  }
  if (errors.length > 0){
      res.render('signup', {errors});
  }else{
      let hashed_password = await bcrypt.hash(password, 10);
      
      pool.query(
          'SELECT * FROM users WHERE email = $1',[email], (err, result) => {
              if (err){
                  throw err;
              }

              if(result.rows.length > 0){
                  errors.push({message: "Email already regiser!"})
                  console.log('errors = ', errors)
                  res.render('signup', {errors});
              }else{
                  pool.query(
                      `INSERT INTO users(name, email, password)
                      VALUES ($1, $2, $3)
                      RETURNING id, password`,
                      [name, email, hashed_password], (err, result) => {
                          if(err){
                              throw err;
                          }
                          console.log('result = ', result.rows)
                          req.flash('success_msg', "You're now registered, Please Log in")
                          res.redirect('/login');
                      }
                  );

                  // console.log('password = ', hashed_password)
                  // success.push({message: "Register successfull!"})
                  // res.render('signup', { success })
              }
              
          }
      )

  }
  
})

app.get('/login', (req, res) => {
  res.render('login1')
}) 
app.post('/login',urlencodedParser, async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log('email = ', email)
  pool.query(`SELECT * FROM users WHERE email = $1`, [email] , (err, rows) => {
      console.log('rows = ', rows);
      if (rows.length<=0) { res.redirect("/login"); return;}
      let user = rows['rows'][0];    
      console.log('user = ', user);
      let errors = []
      if(typeof user != 'undefined'){
        let pass_fromdb = user.password;          
        var kq = bcrypt.compareSync(password, pass_fromdb);
        if (kq){ 
            console.log("OK");   
            var sess = req.session;  //initialize session variable
            sess.user = true;
            sess.id = user.id;
            sess.name = user.name;
            sess.email = user.email;  

            console.log('sess = ', sess)
            if (sess.back){ 
              console.log(sess.back);
              res.redirect(sess.back);
            }
            else {
                res.redirect("/");
            }                   
        }   
        else {
          errors.push({message: "Email/Password is not correct!"})
          console.log("sai mật khẩu");
          res.render("login1", {errors});
        }
      }else{

        errors.push({message: "Email/Password is not correct!"})
        console.log("Không có tài khoản trong hệ thống");
        console.log("errors = ", errors);
        console.log("------------------------------------");
        res.render("login1", {errors});
      }
  });   
});
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

route(app);
//router
