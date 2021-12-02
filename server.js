const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')



const db = require('./db/db')


const indexRouter  = require('./routes/index')
const usersRoute = require('./controller/routes.js')
const productRouter  = require('./routes/product')

app.set("view engine" , "ejs")
app.set('views', path.join(__dirname, "views"));

app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Express session
app.use(cookieParser())
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://ian_test:AefvvOADSQqCvITF@ian.qfm7u.mongodb.net/shop?retryWrites=true&w=majority'}),
    cookie:{ maxAge: 180* 60* 100 }
  })
);

// app.use(csrf({ cookie: true }))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});


app.use('/',  indexRouter)
app.use('/user', usersRoute)
app.use('/product',  productRouter)



const port =process.env.PORT || 5000;
app.listen(port, ()=> console.log(`app running on ${port}`))