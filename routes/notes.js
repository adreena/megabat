var express = require('express');
var router = express.Router();
var Note = require('../_schemas/note.schema.js')
router.get('/add', function(req, res, next) {
	console.log(req.user+"************************");
	console.log("creatin note"+ req.params.id);
    res.render('addnote', {title:'New Note'});
});

router.post('/add', function(req, res, next) {

	newNote = new Note({
		content:req,
		subject: "New Note ..."
	});
  res.render('addnote', {title:'New Note', note: newNote});
});

module.exports = router;