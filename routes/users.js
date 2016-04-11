var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

/*Login*/
router.get('/login', function(req, res, next) {
	console.log('??');
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
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
//configuration
passport.use(new LocalStrategy( function(username, password, done) {
    User.getUserByUsername(username , function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
    User.validPassword(password, user.password, function(err, isMatch){
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


/*Register*/
router.get('/register', function(req, res,next) {
   res.render('register',{title: 'Register'});
});
router.post('/register', function(req, res) {
	console.log('registering');
	var name= req.body.name;
	var username= req.body.username;
	var email= req.body.username;
	var password= req.body.password;
	var password2= req.body.password2;

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
			profilepicture : profilepicture
		});
		User.createUser(newUser, function(err,user){
			if(err) throw err;
			console.log(user);
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
