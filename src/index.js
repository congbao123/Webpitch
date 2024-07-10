const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const app = express();
const port = 3000;

require('dotenv').config();


const route = require('./routes');

const db = require('./config/db');

//Connect to DB
db.connect();

app.use(cookieParser());


app.use(express.static(path.join(__dirname,'public')));

// Middleware
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Middleware để parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware toatjs
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// Middleware session
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Sử dụng true nếu bạn đang sử dụng HTTPS
}));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Template engine
app.engine('handlebars', hbs.engine({
    defaultLayout: 'main',
    helpers: {
      index: function (index) {
        return index + 1 ;
      },
      eq: function (arg1, arg2, options) {
        if (arg1 == arg2) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Route
route(app);

// Start server
app.listen(port, () => console.log(` app listening at http://localhost:${port}`));
