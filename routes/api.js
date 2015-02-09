var express = require('express');
var router = express.Router();
var exif = require('exif').ExifImage;

router.post('/photo', function(req, res) {
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
	res.redirect('/');
});

module.exports = router;
