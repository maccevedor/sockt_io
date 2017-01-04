var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
var index = require('./routes/index');
var users = require('./routes/users');
var mysql = require("mysql");
//var db = require('./modules/database');

const app = express();

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://maccevedor:blink5@ds155028.mlab.com:55028/express', (err, database) => {
  if (err) return console.log(err)
  db = database;
});



var document = {name:"David", title:"About MongoDB"};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'ejs')

// uncomment after placing your favicon in /publichttps://sockt-io-maccevedor.c9users.io/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.get('/', index );
app.use('/users', users);

app.post('/quotes', (req, res) => {
  console.log('llegue');
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/listar',(req, res) => {

   db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    console.log(result);
    var document = {name:"Mauricio", title:"acevedo MongoDB"};
    res.render('listar', {quotes: result})
  })

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
  multipleStatements: true
});




con.connect(function(err){
  if(err){
    //console.log('Error connecting to Db');
    return;
  }
    //console.log('Connection established');
});

// con.query(
//   'SET @employee_id = 0; CALL sp_insert_employee(@employee_id, "Ron", "USA"); SELECT @employee_id',
//   function(err,rows){
//     if (err) throw err;

//     console.log('Data received from Db:\n');
//     console.log(rows);
//   }
// );

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});





module.exports = app;




