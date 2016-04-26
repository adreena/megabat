var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db= mongoose.connection;
var relationship = require('mongoose-relationship');
var Note = require('./note.schema.js');
mongoose.connect('mongodb://demo:pass@ds023510.mlab.com:23510/megabat');

var UserSchema= new Schema({
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
	},
	notes:[{ type:Schema.ObjectId, ref:"Note" }]
});



var User = module.exports = mongoose.model('User', UserSchema);
