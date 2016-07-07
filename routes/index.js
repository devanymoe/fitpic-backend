var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('express-jwt');
var jwtCheck = jwt({
  secret: new Buffer(process.env.CLIENT_SECRET, 'base64'),
  audience: process.env.CLIENT_ID
});

function Users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', jwtCheck, function(req, res, next) {
  Users().select().where('id', req.user.sub).then(function(data) {
    if (!data.length) {
      Users().insert({id: req.user.sub, email: req.body.email, username: req.body.username, units: 'us'}, '*').then(function(data) {
        res.send(data[0]);
      })
    }
    else {
      res.send(data[0]);
    }
  });
});

module.exports = router;
