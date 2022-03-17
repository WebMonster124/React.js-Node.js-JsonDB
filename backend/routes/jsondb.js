var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");

const JSONdb = require('simple-json-db');
const db = new JSONdb('../bookdata.json');//pxfbWe7VZob2K3B2q9HoQAKSdngfmogj

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', function(req, res, next){
  var key = randomstring.generate();
  db.set(key, {key: key, title: req.body.title, author: req.body.author});
  res.json({status: "success", key: key});
});

router.post('/all', function(req, res, next){
  res.json(db.JSON());
});

router.post('/get', function(req, res, next){
  res.json(db.get(req.body.key));
});

router.post('/update', function(req, res, next){
  db.set(req.body.key, {title: req.body.title, author: req.body.author});
  res.json({status: "success", key: req.key});
});

router.post('/delete', function(req, res, next){
  db.delete(req.body.key);
  res.json({status: "success", key: req.body.key});
})

module.exports = router;