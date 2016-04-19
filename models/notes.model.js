var user = require('./user.model.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var NoteSchema = new Schema({
	author : {
		type: Schema.objectId, 
	    ref : "User",
		childPath:"notes"
	},
	content:{
		type: String
	},
	subject:{
		type: String
	},
	publishedOn
		type: Date,
		default: Date.now
	}

});
var Note = module.exports = mongoose.model('Note', NoteSchema);