// Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the path to the views folder
app.set('views', path.join(__dirname, 'views'));

// Set the path to the static folder
app.use(express.static(path.join(__dirname, 'static')));

// Use bodyparser to parse the data
app.use(bodyParser.urlencoded({ extended: true }));

// Use the comments.json file to store the comments
var comments = require('./comments.json');

// Display the comments
app.get('/', function(req, res) {
    res.render('comments', { comments: comments });
});

// Add a comment
app.post('/', function(req, res) {
    var comment = req.body.comment;
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment added');
        }
    });
    res.redirect('/');
});

// Start the server on port 3000
app.listen(3000, function() {
    console.log('Server started on port 3000');
});