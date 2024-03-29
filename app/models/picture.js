var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
	path: String,
	user: mongoose.Schema.Types.ObjectId,
	vacation: mongoose.Schema.Types.ObjectId,
	date: Date,
	caption: String
});

mongoose.model('Picture', PictureSchema);
