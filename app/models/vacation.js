var mongoose = require('mongoose');

var VacationSchema = new mongoose.Schema({

	title: String,
	titleSlug: String,
	//summary: String,
	description: String,
	numberOfItems: Number,    
	startDate: Date,
	endDate: Date,
	private: Boolean,
	users: [mongoose.Schema.Types.ObjectID]    

});

mongoose.model('Vacation', VacationSchema);
