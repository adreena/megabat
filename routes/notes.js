var express = require('express');
var router = express.Router();
var Note = require('../_schemas/note.schema.js');
var NoteController = require('../_controllers/note.controller.js');
var multer = require('multer');
var upload = multer({dest: './public/uploads'});

router.get('/add', function(req, res, next) {
	console.log(req.user+"************************");
	console.log("creatin note"+ req.params.id);
    res.render('addnote', {title:'New Note'});
});

router.post('/add', upload.single('noteimage'), function(req, res, next) {

	if(req.file){
		console.log('Uploading File...');
		var noteimage = req.file.filename;
	} else {
		console.log('No File Uploaded...');
		var noteimage = 'noimage.jpg';
	}
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body','Body field is required').notEmpty();
	var errors = req.validationErrors();
		if(errors){
			res.render('addnote', {errors: errors});
		}
		else{
			newNote = new Note({
				content: req.body.body,
				subject: req.body.title,
				author: req.user._id,
				noteimage: noteimage,
				rank: 0
			});

		  NoteController.createNote(newNote, function(err,note){
		  	if(err) 
		  		res.send(err);
			console.log(note);
		  	req.flash('success', 'Post added!');
		  	res.location('/users/show/'+req.user._id);
		  	res.redirect('/users/show/'+req.user._id);
		  })
		}
  
});

module.exports = router;