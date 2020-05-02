var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(__dirname + '/'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join('build', 'index.html'));
    });
  }

app.listen(process.env.PORT || 8080);