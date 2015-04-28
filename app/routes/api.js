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
	Vacation.find({private: false}, function(err, vacations) {
		res.send(vacations);
	});
	//res.send('Vacation API');
	//Will return all vacations
});

router.post('/vacation', function(req, res) {
	var myVaca = new Vacation();
	myVaca.title = req.body.name;
	myVaca.titleSlug = slugify(req.body.name);
	myVaca.startDate = new Date(req.body.startDate);
	myVaca.endDate = new Date(req.body.endDate);
	myVaca.description = req.body.description;
	if(req.body.privacy) {
		myVaca.private = req.body.privacy;
	}
	else {
		myVaca.private = false;
	}
	myVaca.save(function(err, savedVac) {
		if (err) return handleError(err);
		//res.redirect('/vacation/' + savedVac.id);
		res.end();
	});
	//Create a new vacation
});

router.get('/vacation/:vacaid', function(req, res) {
	Vacation.findById(req.params.vacaid, function(err, found) {
		res.send(found);
	});
});

router.delete('/vacation/:vacaid', function(req,res) {
	Vacation.remove({_id: req.params.vacaid}, function(err) {
		if(!err) res.end();
	});
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

function slugify(text) {
	return text.toString().toLowerCase()
	.replace(/\s+/g, '-')           // Replace spaces with -
	.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	.replace(/\-\-+/g, '-')         // Replace multiple - with single -
	.replace(/^-+/, '')             // Trim - from start of text
	.replace(/-+$/, '');            // Trim - from end of text
}

module.exports = router;
