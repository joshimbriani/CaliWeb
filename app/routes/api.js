var express = require('express');
var router = express.Router();
var exif = require('exif').ExifImage;
var mongoose = require('mongoose');
var picture = require('../models/picture');
var vacation = require('../models/vacation');
var caption = require('../models/caption');
var Picture = mongoose.model('Picture');
var Vacation = mongoose.model('Vacation');
var Caption = mongoose.model('Caption');

router.get('/vacation', function(req, res) {
	res.send('Vacation API');
	//Will return all vacations
});

router.post('/vacation', function(req, res) {
	res.redirect('/');
	//Create a new vacation
});

router.get('/vacation/:vacaid/caption', function(req, res) {
	res.send('Vacation Caption API');
	//Will return all captions for a vacation
});

router.post('/vacation/:vacaid/caption', function(req, res) {
	res.redirect('/');
	//Create a new caption for a specific vacation
});

router.get('/vacation/:vacaid/photo', function(req, res) {
	res.send('Vacation Photo API');
	//Will return all photos for a vacation
});

router.post('/vacation/:vacaid/photo', function(req, res) {
	res.redirect('/');
	//Create a new photo
});

router.post('/photo', function(req, res) {
	var theVacation = Vacation.findOne({user:req.user}).where('startDate').lt(Date.now()).where('endDate').gt(Date.now()).exec(function(err, vaca) {
		if (typeof req.user !== 'undefined' && vaca) {
			try {
				new exif({image:req.files.fileupload.path}, function(error, exifData) {
					if (error) {
						console.log('Error: ' + error.message);
					} else {
						console.log(exifData);
						
					}
				});
			} catch (error) {
				console.log('Error: ' + error.message);
			}
			res.send(200);
		} else {	
			res.send(403);
		}
	});
	
});

router.post('/vacation', function(req, res) {
	
});

module.exports = router;
