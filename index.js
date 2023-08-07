var express = require('express');
const fs = require('fs');
const data = require('./data/point1.json')


function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/aws/list1', function (req, res) {
  jsonReader("./data/point1.json", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  });
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})

app.get('/aws/list2', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})

app.post('/submit', (req, res) => {
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
