const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://maccevedor:blink5@ds155028.mlab.com:55028/express', (err, database) => {
  if (err) return console.log(err)
  const db = database;
});