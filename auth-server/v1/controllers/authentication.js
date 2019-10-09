const mongoose = require('mongoose');
const User = mongoose.model('User');

function register(req, res){
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        let user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);
        
        user.save(err => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                res.status(201).json({token: user.generateToken()});
            }
        });
    }
}

function login(req, res){
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                res.status(200).json({token: user.generateToken()});
            }
        });
    }
}

module.exports = {
    register,
    login
}