var Note = require('../_schemas/note.schema.js');

module.exports.createNote = function(newNote, callback){
	console.log('creating note ...');
	//newUser.save(callback);
	newNote.save(callback);
	
}; 

module.exports.getUserNotes = function(userID, callback){
	var query = Note.find({author: userID});
	query.sort('rank');
	query.exec(callback);
}; 