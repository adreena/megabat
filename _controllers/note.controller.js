var Note = require('../_schemas/note.schema.js');

module.exports.createNote = function(newNote, callback){
	console.log('creating note ...');
	//newUser.save(callback);
	newNote.save(callback);
	
}; 

module.exports.getUserNotes = function(userID, callback){
	console.log('get all user Notes ... for '+ userID + typeof userID);
	Note.find({author: userID}, callback);
}; 