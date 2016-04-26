var User = require('../_schemas/user.schema.js');
var bcrypt = require('bcryptjs');


module.exports.createUser = function(newUser, callback){
	console.log('creating user ...');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        console.log("&&"+newUser.name + newUser.username);
	        newUser.save(callback);
	    });
	});
}; 

module.exports.validPassword = function(candiatePassword, hash, callback){
	bcrypt.compare(candiatePassword, hash, function(err, isMatch) {
	    callback(null, isMatch);
	});
}; 

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}; 
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUsers = function(callback){
	console.log('****getUsers');
	User.find(function (err, users) {
		console.log(users);
	  callback(err,users);

	})
};

module.exports.filterByGroup = function(req,res){
	var query = User.find();
	var filter = req.body.group;
	if(filter.length>0)
    {
    	query.where({group:filter});
    }  
    query.exec(function(err, results){
    	if(err) throw err;
    	res.render('index', { title: 'Members', allUsers:results})
    });

}