var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	name: String,
	password: String,
	group: String
});

UserSchema.pre('save', function(next) {
	console.log('Pre save');
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
				user.password = hash;
				next();
			});
		});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
			cb(null, isMatch);
	});
};

mongoose.model('User', UserSchema);
