var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
	},
	group: {
		type: String
	}
});

module.exports = mongoose.model('User', userSchema);
