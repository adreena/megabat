var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserController = require('../_controllers/user.controller.js');
var NoteController = require('../_controllers/note.controller.js');
var User = require('../_schemas/user.schema.js');
var Note = require('../_schemas/note.schema.js');
var moment = require('moment');
/*Login*/
router.get('/login', function(req, res, next) {
	console.log("loggedin");
  res.render('login', {title:'Login'});
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/',failureFlash: '/login' }),
	function(req,res){
		req.flash('success','Logged in');
		res.redirect('/');
});
// session                                   
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  UserController.getUserById(id, function(err, user) {
    done(err, user);
  });
});
//configuration
passport.use(new LocalStrategy( function(username, password, done) {
    UserController.getUserByUsername(username , function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
    UserController.validPassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

/*End Login*/

/*Show User*/
router.get('/show/:id', function(req, res) {
  console.log("****"+req.params.id);
  UserController.getUserById(req.params.id, function(err, user) {

  	NoteController.getUserNotes(user._id, function(err,notes){
  		console.log("GOT NOTES");
		res.render('show',{user:user, notes:notes});
  	})
    
  });

});


/*Register*/
router.get('/register', function(req, res,next) {
   res.render('register',{title: 'Register'});
});
router.post('/register' , upload.single('profilepicture') , function(req, res) {
	console.log('registering');
	var name= req.body.name;
	var username= req.body.username;
	var email= req.body.email;
	var password= req.body.password;
	var password2= req.body.password2;
    console.log("****"+name+' '+username+' '+ email +' '+password);
	if(req.file){
		console.log('Uploading File...');
		var profilepicture = req.file.filename;
	} else {
		console.log('No File Uploaded...');
		var profilepicture = 'noimage.jpg';
	}

	//check validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	if(errors){
		res.render('register', {errors: errors});
	}
	else{
		var newUser = new User({
			name:name,
			username:username,
			email: email,
			password : password,
			profilepicture : profilepicture,
			group:'A'
		});
		UserController.createUser(newUser, function(err,user){
			if(err) throw err;
			console.log(user);
			var newNote = new Note({author:newUser._id, subject:"sbj 1"});
			NoteController.createNote(newNote, function(err,note){
				if(err) throw err;
				console.log("**********");
				console.log(note);
			});
			var newNote2 = new Note({author:newUser._id, subject:"sbj 2"});
			NoteController.createNote(newNote2, function(err,note){
				if(err) throw err;
				console.log("**********");
				console.log(note);
			});
			
		});
	}
   req.flash('success',"User creates successfully!");
   res.redirect('/users/login');
});
/*End Register*/

/*logout */
router.get('/logout', function(req, res,next) {
   req.logout();
   req.flash('success','logged out');
   res.redirect('/users/login');
});

/*Contact */
/*About */
module.exports = router;
