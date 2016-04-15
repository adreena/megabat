var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user.js');

/* GET home page. */
router.get('/',  ensureAuthenticated ,function(req,res,next){
	User.getUsers(function(err,users){
			if(err) throw err;
			console.log(users);
			res.render('index', { title: 'Members', allUsers:users});
		});
  	
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/users/login');
}
module.exports = router;