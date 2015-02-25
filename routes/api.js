var express = require('express');
var router = express.Router();
var exif = require('exif').ExifImage;
var mongoose = require('mongoose');
var pictures = require('../models/picture');
var vacation = require('../models/vacation');
var picture = mongoose.model('Picture');
var Vacation = mongoose.model('Vacation');

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
