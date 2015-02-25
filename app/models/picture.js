var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
	path: String,
	user: mongoose.Schema.Types.ObjectId,
	vacation: mongoose.Schema.Types.ObjectId,
});

mongoose.model('Picture', PictureSchema);
