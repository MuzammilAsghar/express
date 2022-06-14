var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.6fkbl.mongodb.net/?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("database connected");
});

module.exports = db;