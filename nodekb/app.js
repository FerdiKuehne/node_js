const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//connect to Data Base

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});


// Check for DB errors
db.on('error', function(err){
    console.log(err);
});





// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');

var port = 3000;

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//https://www.youtube.com/watch?v=cVYQEvP-_PA
//docker container

// Home Route
app.get('/', function (req, res) {
  Article.find({}, function(err, articles){
      if(err){
          console.log(err);
      } else {
        res.render('index', {
            title:'Articles',
            articles: articles
        });
      }
  });
});


// Add Route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
      title:'Add Article'
  });
});


// Start Server
app.listen(port, function () {
  console.log('Server Online at %s', port);
});



