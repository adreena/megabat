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

//Add a new note
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
		  });
		}
  
});

//Edit a note
router.get('/edit/:id', function(req,res, next){
	console.log("************ EDIT");
	NoteController.findNote(req.params.id, function(err,note){
		if(err) throw err
	    res.render('editnote', {title: "Edit Note:", note: note});
	});
	
});
router.post('/edit/:id', upload.single('noteimage'), function(req,res, next){
	//TODO post update note
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body','Body field is required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.render('editnote', {errors: errors});
	}
	else{
		var changes = {
				subject : req.body.title,
				content : req.body.body
			};
		NoteController.updateNote(changes, req.params.id, function(err){
			if(err)
				throw err;
			req.flash('success', 'Post Updated!');
		  	res.location('/users/show/'+req.user._id);
		  	res.redirect('/users/show/'+req.user._id);
		})
	}
});

//delete a note
router.get('/delete/:id', function(req,res, next){
	NoteController.deleteNote(req.params.id, function(err){
		if(!err){
			console.log('deleted');
			req.flash('success', 'Post deleted!');
			res.redirect('/users/show/'+req.user._id);
		}
		else{
			console.log('failed to delete the post');
			req.flash('error', 'failed to delete the post');
			res.redirect('/users/show/'+req.user._id);
	    }
	});

});


//like a note
router.get('/like/:id', function(req,res, next){
	console.log("************ Like");
	NoteController.likeNote(req.params.id, function(err,note){
		if(err) throw err
	    req.flash('success', 'you Liked the post!');
		res.location('/users/show/'+note.author);
		res.redirect('/users/show/'+note.author);
	});
	
});

module.exports = router;