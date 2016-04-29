var Note = require('../_schemas/note.schema.js');

module.exports.createNote = function(newNote, callback){
	console.log('creating note ...');
	newNote.save(callback);
}; 

module.exports.findNote = function(noteID, callback){
	Note.findById(noteID,callback);
}; 

module.exports.getUserNotes = function(userID, callback){
	var query = Note.find({author: userID});
	query.sort('publishedOn');
	query.exec(callback);
}; 

module.exports.deleteNote = function(noteID,callback){

	Note.remove({_id: noteID},callback);
}; 

module.exports.updateNote = function(changes, noteID ,callback){
	console.log("Change**\n"+ noteID +"\n");
    console.log("Change**\n"+ changes.subject +"\n");
    console.log("Change**\n"+ changes.content +"\n");
    var options = { multi: true }; 
    var updates = {$set: {subject:changes.subject, content: changes.content}};
    var condition = {_id: noteID};
	Note.update( condition,updates, options ,callback);
};

module.exports.likeNote = function(noteID ,callback){
	console.log("**"+ noteID +"\n");
    var options = { multi: false }; 
    Note.findById(noteID,function(err, note){
    	if(err) throw err;
    	note.rank +=1;
		note.save(callback);
    });    
};

module.exports.addComment = function(noteID ,callback){
	console.log("**"+ noteID +"\n");
    var options = { multi: false }; 
    Note.findById(noteID,function(err, note){
    	if(err) throw err;
    	note.rank +=1;
		note.save(callback);
    });
    
};

