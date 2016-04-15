var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var db= mongoose.connection;

mongoose.connect('mongodb://demo:pass@ds023510.mlab.com:23510/megabat');

var userSchema= new Schema({
	name : {
		type: String,
		index: true,
	},
	username : {
		type: String
	},
	email : {
		type: String
	},
	password : {
		type: String
	},
	profilepicture : {
		type:String
	},
	joinedOn:{
		type:Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);
module.exports.createUser = function(newUser, callback){
	console.log('creating user ...');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}; 

module.exports.validPassword = function(candiatePassword, hash, callback){
	bcrypt.compare(candiatePassword, hash, function(err, isMatch) {
	    callback(null, isMatch);
	});
}; 

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}; 
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUsers = function(callback){
	User.find(function (err, users) {
	  callback(err,users);
	})
};