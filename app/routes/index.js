var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.resolve(__dirname + '../../../front/index.html'));
});

module.exports = router;
