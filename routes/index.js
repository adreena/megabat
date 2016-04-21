var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller.js');

/* GET home page. */
router.get('/',  ensureAuthenticated ,function(req,res,next){
	
	UserController.getUsers(function(err, users){
		if(err) throw err;
		console.log("ALL USERS:");
		res.render('index', { title: 'Members', users: users });
	});
  	
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/users/login');
}
module.exports = router;