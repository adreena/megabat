var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db= mongoose.connection;
//var noteModel = require('./notes.model.js');
mongoose.connect('mongodb://demo:pass@ds023510.mlab.com:23510/megabat');

var NoteSchema = new Schema({
	author : { type: Number, ref: 'User' },
	content:{
		type: String
	},
	subject:{
		type: String
	},
	publishedOn:{
		type: Date,
		default: Date.now
	}

});

var childSchema = new Schema({name: 'string'});
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
	children:[childSchema]
});



var User = module.exports = mongoose.model('User', UserSchema);
var Note = module.exports = mongoose.model('Note', NoteSchema);
