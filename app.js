var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

console.log( __dirname );

app.use(express.static(__dirname + '/dist'));

app.listen(port, function() {
  console.log("Listening on port " + port)
});