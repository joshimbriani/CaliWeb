var express = require('express');
var router = express.Router();
var exif = require('exif').ExifImage;
var mongoose = require('mongoose');
var picture = require('../models/picture');
var vacation = require('../models/vacation');
var caption = require('../models/caption');
var user = require('../models/user');
var Picture = mongoose.model('Picture');
var Vacation = mongoose.model('Vacation');
var Caption = mongoose.model('Caption');
var User = mongoose.model('User');

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
	myVaca.users = [req.user._id];
	myVaca.pictures = [];
	if(req.body.privacy == 'true') {
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

router.post('/vacationphone', function(req, res) {
	User.find({}, function(err, users) {
		if (err) throw err;
		var myVaca = new Vacation();
		myVaca.title = req.body.name;
		myVaca.titleSlug = slugify(req.body.name);
		myVaca.startDate = new Date(req.body.startDate);
	        myVaca.endDate = new Date(req.body.endDate);
		myVaca.description = req.body.description;
		console.log(users);
		myVaca.pictures = [users[0]._id];
		myVaca.pictures = [];
		if(req.body.privacy) {
			myVaca.private = req.body.privacy;
		} else {
			myVaca.private = false;
							        }
	        myVaca.save(function(err, savedVac) {
			if (err) return handleError(err);
			res.end();
		});
	});
});

router.get('/vacation/byuser/:userid', function(req, res) {
	Vacation.find({users: mongoose.Types.ObjectId(req.params.userid)}, function(err, vacas) {
		res.send(vacas);
	});
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
	Picture.find({vacation: req.params.vacaid}, function(err, foundPictures) {
		if (!err) res.send(foundPictures);
	});
	//Will return all photos for a vacation
});

router.post('/vacation/:vacaid/photo', function(req, res) {
	res.redirect('/');
	//Create a new photo
});

router.get('/user/:userid', function(req, res) {
	User.getById(req.param.userid, function(err, user) {
		if (err) throw err;
		res.send(user);
	});
});

router.put('/photo/:photoid', function(req, res) {
	Picture.findById(req.params.photoid, function(err, picture) {
		picture.caption = req.body.caption;
		picture.save(function(err) {
			if (err) throw err;
			res.send(picture);
		});
	});
});

router.delete('/photo/:photoid', function(req, res) {
	Picture.remove({_id: req.params.photoid}, function(err) {
		if (err) throw err;
		res.end();
	});
});

router.post('/photo', function(req, res) {
	Vacation.findOne({users:req.user._id}).where('startDate').lt(Date.now()).where('endDate').gt(Date.now()).exec(function(err, vaca) {
		if (err) throw err;
		if (typeof req.user !== 'undefined' && vaca) {
			try {
				new exif({image:req.files.fileupload.path}, function(error, exifData) {
					if (error) {
						console.log('Error: ' + error.message);
					} else {
						var newPic = new Picture();
						newPic.path = req.files.fileupload.path;
						newPic.user = req.user;
						newPic.vacation = vaca;
						if (exifData.exif.CreateDate != '') {
							newPic.date = new Date(exifData.exif.CreateDate);
						} else {
							newPic.date = Date.now();
						}
						newPic.save(function(err, savedPic) {
							if (err) throw err;
							vaca.pictures.push(savedPic._id);
							vaca.save(function(err) {
								if (err) throw err;
								res.sendStatus(200);
							});
							//res.sendStatus(200);
						});
					}
				});
			} catch (error) {
				console.log('Error: ' + error.message);
			}
			//res.sendStatus(200);
		} else {	
			res.sendStatus(403);
		}
	});
	
});

/*router.post('/vacation', function(req, res) {
	
});*/

function slugify(text) {
	return text.toString().toLowerCase()
	.replace(/\s+/g, '-')           // Replace spaces with -
	.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	.replace(/\-\-+/g, '-')         // Replace multiple - with single -
	.replace(/^-+/, '')             // Trim - from start of text
	.replace(/-+$/, '');            // Trim - from end of text
}

module.exports = router;
