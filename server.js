const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/test', (req, res) => {
    res.json({lala : 'lala'});
})

app.use(express.static(__dirname + '/dist/test-one'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/test-one/index.html'));
});
  
const port = process.env.PORT || 5000;
app.listen(port);