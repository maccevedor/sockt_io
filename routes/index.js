var express = require('express');
var router = express.Router();
//const db  =	require('../modules/database');





var document = {name:"Mauricio", title:"acevedo MongoDB"};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
