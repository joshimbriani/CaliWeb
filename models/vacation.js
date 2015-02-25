var mongoose = require('mongoose');

var VacationSchema = new mongoose.Schema({

	title: String,
	startDate: Date,
	endDate: Date,
	users: [mongoose.Schema.Types.ObjectID]    

});
