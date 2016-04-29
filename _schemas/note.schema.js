var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var User = require('./user.schema.js');

var NoteSchema = new Schema({
	author : { 
		type:Schema.ObjectId, 
		ref:"User", 
		childPath:"notes" 
	},
	content:{
		type: String
	},
	subject:{
		type: String
	},
	publishedOn:{
		type: Date,
		default: Date.now
	},
	noteimage : {
		type:String
	},
	rank :{
		type: Number,
		default: 1
	},
	//comments
});

NoteSchema.plugin(relationship, { relationshipPathName:'author' });

var Note = module.exports = mongoose.model('Note', NoteSchema);