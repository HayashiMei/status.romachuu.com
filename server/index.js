const api = require('./api');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const headerConfig = (req, res, next) => {
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'authorization, content-type, product-code, encrypt-type');
  next();
};

app.use(headerConfig);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getMonitorList', async (req, res) => {
  api.getDashboard().then(resp => {
    res.end(JSON.stringify(resp.data));
  });
});

app.get('/getMonitor', async (req, res) => {
  api.getDetails(req.query.m).then(resp => {
    res.end(JSON.stringify(resp.data));
  });
});

const server = app.listen(1090, function() {
  const { address, port } = server.address();
  console.log('express start, http://%s:%s', address, port);
});
