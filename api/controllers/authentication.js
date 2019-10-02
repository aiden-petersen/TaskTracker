// const mongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const assert =  require('assert');
const express_jwt = require('express-jwt');

if(!process.env.JWT_SECRET)
{
    // No secret, we cannot proceed
    // TODO: need a better way to handle these fatal errors
    // console.log might not get printed
    console.log("Error: JWT_SECRET environment variable needs to be set");
    process.exit(1);
}
const secret = process.env.JWT_SECRET;

const mongo_port = process.env.MONGO_PORT;
// Connect to mongo
// TODO: mongo is the host name, we should get this from an env
const url = 'mongodb://mongo:'+mongo_port;
const dbName = 'task-tracker';
const client = new MongoClient(url);
// user collection name
const u_col_nm = 'users';

// TODO: add disconnect logic
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo");
});

const auth = express_jwt({
    secret: secret,
    userProperty: "payload"
});

function register(req, res){
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        // TODO: need to check that usernames are unique, can use hash table
        // TODO: hash password instead of saving it
        // TODO: set expiry date
        // TODO: need to hash password instead

        // save username and password to database and return JWT
        const db = client.db(dbName);
        const user = {
            username: req.body.username,
            password: req.body.password
        };
        db.collection(u_col_nm).insertOne(user, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.insertedCount);
            // Create and return the JWT
            const user_token = jwt.sign({
                user: req.body.username,
            }, secret);
            res.status(201).json(user_token);
        });
    }
}

function login (req, res){
    // Check that the username and password are valid and then send JWT
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        // TODO: need to check that usernames are unique, can use hash table
        // TODO: hash password instead of saving it
        // TODO: set expiry date
        // TODO: need to hash password instead
        // save username and password to database and return JWT
        const db = client.db(dbName);
        const user = {
            username: req.body.username,
            password: req.body.password
        };
        db.collection(u_col_nm).findOne(user, (err, result) => {
            assert.equal(err, null);
            assert.equal(err, null);
            if(result){
                // we found the user, now send JWT
                // Create and return the JWT
                const user_token = jwt.sign({
                    user: req.body.username,
                }, secret);
                res.status(201).json(user_token);
            } else {
                res.status(403).json({message: "invalid user and pass"});
            }
        });
    }
}

module.exports = {
    login,
    register,
    auth
};
