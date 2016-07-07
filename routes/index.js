var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  Users().select().where('email', req.body.email).then(function(data) {
    if (!data.length) {
      Users().insert({email: req.body.email, username: req.body.username, units: 'us'}, '*').then(function(data) {
        res.send(data);
      })
    }
    else {
      res.send(data);
    }
  });
});

module.exports = router;
