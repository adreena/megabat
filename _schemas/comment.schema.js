var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var User = require('./user.schema.js');
var Note = require('./note.schema.js');

var CommentSchema = new Schema({
	commenter : { 
		type:Schema.ObjectId, 
		ref:"User", 
		childPath:"comments" 
	},
	content:{
		type: String
	},
	date:{
		type: Date,
		default: Date.now
	},
	noteID: {
		type: Schema.ObjectId
	}
});

CommentSchema.plugin(relationship, { relationshipPathName:'commenter' });

var Comment = module.exports = mongoose.model('Comment', CommentSchema);