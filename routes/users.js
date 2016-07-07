var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Users = require('../models/users');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var S3Upload = require('s3-uploader');
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

router.get('/:id', function(req, res, next) {
  Users.getUser(req.params.id).then(function(data) {
    res.send(data);
  });
});

router.get('/:id/pictures', function(req, res, next) {
  Users.getAllUserPictures(req.params.id).then(function(data) {
    res.send(data);
  });
});

router.post('/:id/pictures/new', upload.single('image'), function(req, res, next) {
  client.upload(req.file.path, {}, function(err, versions, meta) {
    if (err) { throw err; }
    Users.postImage(versions[0].url, req.body.type, req.body.date, req.params.id).then(function(data) {
      res.send(data);
    });
  });
});

router.get('/:id/pictures/:type', function(req, res, next) {
  Users.getLastPicture(req.params.id, req.params.type).then(function(data) {
    res.send(data);
  });
});

router.get('/:id/measurements', function(req, res, next) {
  Users.getAllUserMeasures(req.params.id).then(function(data) {
    res.send(data);
  })
});

router.post('/:id/measurements/new', function(req, res, next) {
  Users.postNewMeasure(req.params.id, req.body).then(function(data) {
    res.send(data);
  })
});

router.delete('/:id/measurements/:measureId/delete', function(req, res, next) {
  Users.deleteMeasure(req.params.measureId).then(function(data) {
    res.sendStatus(200);
  })
});

router.get('/:id/all', function(req, res, next) {
  Users.getAllUserPictures(req.params.id).then(function(pictures) {
    Users.getAllUserMeasures(req.params.id).then(function(measurements) {
      res.send({pictures, measurements});
    })
  });
});

module.exports = router;
