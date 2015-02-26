var mongoose = require('mongoose');

var CaptionSchema = new mongoose.Schema({
	body: String,
	afterCaption: mongoose.Schema.Types.ObjectID 
});

mongoose.model('Caption', CaptionSchema);
