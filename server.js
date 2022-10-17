const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 원래상태
const http = require('http').createServer(app);
http.listen(8095, function () {
  console.log('listening on 8095');
});

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
  'mongodb+srv://cluster0.m6teidu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

  { useUnifiedTopology: true },
  function (에러, client) {
    if (에러) {
      return console.log('dd', 에러);
    }

    db = client.db('test');
    console.log(db);
  },
);

app.use(express.static(path.join(__dirname, 'todolist/build')));

app.post('/api/login', (req, res) => {
  res.send({
    email: req.body.email,
    password: req.body.password,
    state: true,
  });

  db.collection('testApi').insertOne(
    {
      email: req.body.email,
      password: req.body.password,
      state: true,
    },
    (err, res) => {
      console.log(req.body);
    },
  );
  console.log('res.body:', {
    email: req.body.email,
    password: req.body.password,
    state: true,
  });
});
app.get('/api/login', (req, res) => {
  res.send({
    state: true,
  });
  console.log(res);
});

app.post('/test', (req, res) => {
  res.send('응답성공');
  console.log(req);
  db.collection('testApi').insertOne(
    { name: req.body.name, date: req.body.date },
    (err, res) => {
      console.log(req.body);
    },
  );
});
