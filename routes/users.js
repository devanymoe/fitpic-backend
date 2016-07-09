var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Users = require('../models/users');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var S3Upload = require('s3-uploader');
var jwt = require('express-jwt');
var jwtCheck = jwt({
  secret: new Buffer(process.env.CLIENT_SECRET, 'base64'),
  audience: process.env.CLIENT_ID
});
var client = new S3Upload('fitpic', {
  aws: {
    path: 'images/',
    region: 'us-west-2',
    acl: 'public-read',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },

  cleanup: {
    versions: true,
    original: true
  },

  original: {
    awsImageAcl: 'public-read'
  },

  versions: [{
    maxHeight: 2000,
    maxWidth: 1500,
    format: 'jpg',
    quality: 80,
  }]
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', jwtCheck, function(req, res, next) {
  // Users.getUser(req.user).then(function(data) {
  //   res.send(data);
  // });
  console.log(req.user)
  res.sendStatus(200)
});

router.get('/pictures', jwtCheck, function(req, res, next) {
  Users.getAllUserPictures(req.user.sub).then(function(data) {
    res.send(data);
  });
});

router.post('/pictures/new', jwtCheck, upload.single('image'), function(req, res, next) {
  client.upload(req.file.path, {}, function(err, versions, meta) {
    if (err) { throw err; }
    Users.postImage(versions[0].url, req.body.type, req.body.date, req.user.sub).then(function(data) {
      res.send(data);
    });
  });
});

router.get('/pictures/:type', jwtCheck, function(req, res, next) {
  Users.getLastPicture(req.user.sub, req.params.type).then(function(data) {
    res.send(data);
  });
});

router.get('/measurements', jwtCheck, function(req, res, next) {
  Users.getAllUserMeasures(req.user.sub).then(function(data) {
    res.send(data);
  })
});

router.post('/measurements/new', jwtCheck, function(req, res, next) {
  Users.postNewMeasure(req.user.sub, req.body).then(function(data) {
    res.send(data);
  })
});

router.delete('/measurements/:measureId/delete', jwtCheck, function(req, res, next) {
  Users.deleteMeasure(req.params.measureId).then(function(data) {
    res.sendStatus(200);
  })
});

router.get('/all', jwtCheck, function(req, res, next) {
  Users.getAllUserPictures(req.user.sub).then(function(pictures) {
    Users.getAllUserMeasures(req.user.sub).then(function(measurements) {
      res.send({pictures, measurements});
    })
  });
});

router.get('/progress', jwtCheck, function(req, res, next) {
  Users.getProgress(req.user.sub).then(function(data) {
    res.send(data);
  });
});

router.get('/progress/weight', jwtCheck, function(req, res, next) {
  Users.getProgressWeight(req.user.sub).then(function(data) {
    console.log(data)
    res.send(data);
  });
});

module.exports = router;
