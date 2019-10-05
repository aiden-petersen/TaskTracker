const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

const mongo_port = process.env.MONGO_PORT;
// Connect to mongo
const url = 'mongodb://mongo:'+mongo_port;
const dbName = 'task-tracker';
const client = new MongoClient(url);

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo");
});

function validateTaskId(req, res, next, taskid){
    // TODO validate task id
    console.log("validating task id :"+taskid);
    next();
}

// TODO: Need to add a limit to this incase we fill memory when we use toArray
// TODO: Need to sort this so that it returns in sorted order
function getTasksByStartDate(req, res) {
    const db = client.db(dbName);
    db.collection('tasks').aggregate([
        { $group: { 
            _id: { $dateFromString: { dateString: { $dateToString: { date: "$startDate", format: "%Y-%m-%d" } } }},
            tasks: { $push: { title: "$title", startDate: "$startDate", stopDate: "$stopDate", duration: { $subtract: [ "$stopDate", "$startDate" ] }, _id: "$_id" } },
            totalDuration: { $sum: { $subtract: [ "$stopDate", "$startDate" ] } }
            }
        } ],
        (error, result) => {
            result.toArray(function(err, tasks) {
            if (err) throw err;
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json( tasks );
        });
    });
}

// Creates new task in the db and returns the task
function createTask(req, res){
    if(req.body.title && req.body.start_date && req.body.stop_date) {
        // TODO: need to check that input items are valid
        const db = client.db(dbName);
        db.collection('tasks').insertOne({title: req.body.title, startDate: new Date(req.body.start_date), stopDate: new Date(req.body.stop_date) }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.insertedCount);
            res.status(201).json(result.ops[0]);
        });
    } else {
        res.status(400).json({message: "failed to create task"});
    }
}

function getTask(req, res){
    const db = client.db(dbName);

    // Task IDs should be 24 characters long in hex
    if(ObjectID.isValid(req.params.taskid) && req.params.taskid.length == 24){
        db.collection('tasks').findOne({_id: ObjectID(req.params.taskid)}, function(err, result) {
            assert.equal(err, null);
            if(result){
                result.duration = result.stopDate - result.startDate;
                res.status(200).json(result);
            } else {
                res.status(404).json({message: "taskid not found"});
            }
        });
    } else {
        res.status(404).json({message: "taskid not found"});
    }
}

// TODO: This should return the updated task
function updateTask(req, res){
    console.log("updating task");
    if(req.body.title || req.body.start_date || req.body.stop_date){
        if(req.body.title) {
            // TODO: need to check that input items are valid
            const db = client.db(dbName);
            db.collection('tasks').updateOne({_id: ObjectID(req.params.taskid)},  { $set: { title: req.body.title } } , function(err, result) {
                assert.equal(err, null);
            });
        }
        if(req.body.start_date) {
            // TODO: need to check that input items are valid
            const db = client.db(dbName);
            db.collection('tasks').updateOne({_id: ObjectID(req.params.taskid)},  { $set: { startDate: new Date(req.body.start_date) } } , function(err, result) {
                assert.equal(err, null);
            });
        }
        if(req.body.stop_date) {
            // TODO: need to check that input items are valid
            const db = client.db(dbName);
            db.collection('tasks').updateOne({_id: ObjectID(req.params.taskid)},  { $set: { stopDate: new Date(req.body.stop_date) } } , function(err, result) {
                assert.equal(err, null);
            });
        }
        res.status(200).json({message: "updated"});
    }
    else
    {
        res.status(400).json({message: "input update items are not good"});
    }
}

function deleteTask(req, res){
    const db = client.db(dbName);

    // Task IDs should be 24 characters long in hex
    if(ObjectID.isValid(req.params.taskid) && req.params.taskid.length == 24){
        db.collection('tasks').findOneAndDelete({_id: ObjectID(req.params.taskid)}, function(err, result) {
            assert.equal(err, null);
            console.log(result);
            if(result.value){
                res.status(204).json({message: "Task deleted"});
            } else {
                res.status(404).json({message: "taskid not found"});
            }
        });
    } else {
        res.status(404).json({message: "taskid not found"});
    }
}

// Currently, our DB only stores 1 active task
// This function checks the DB for any active tasks and returns it if it exists
function getActiveTask(req, res){
    const db = client.db(dbName);
    db.collection("active_task").findOne({}, (err, result) => {
        assert.equal(err, null);
        if (result){
            res.status(200).json(result);
        } else {
            res.status(200).json({message: "no active task found"});
        }
    });
}

// This function creates an active task if one does not already exists, returns error if one exists
function createActiveTask(req, res){
    const db = client.db(dbName);
    if(req.body.title && req.body.start_date){
        db.collection("active_task").findOne({}, (err, result) => {
            assert.equal(err, null);
            if(result){
                // Means there is already and active task and we cant create a new one
                res.json(403);
            } else {
                db.collection("active_task").insertOne({title: req.body.title, startDate: new Date(req.body.start_date)}, (err, result) => {
                    assert.equal(err, null);
                    assert.equal(1, result.insertedCount);
                    res.status(201).json(result.ops[0]);
                } );
            }
        });
    } else {
        res.json(400);
    }
}

// TODO: clean up this function
// This function updates an active task, this can be the title, the startDate or the stopDate,
// If stopdate is updated, then the task gets finished and pushed to the completed tasks database
function updateActiveTask(req, res){
    if(req.body.title || req.body.start_date || req.body.stop_date){
        // Fist check that there is an active task
        const db = client.db(dbName);
        db.collection("active_task").findOne({}, (err, result) => {
            assert.equal(err, null);
            if (result){
                if(req.body.title) {
                    db.collection('active_task').updateOne({_id: ObjectID(result._id)},  { $set: { title: req.body.title } } , function(err, result) {
                        assert.equal(err, null);                        
                    });
                }
                if(req.body.start_date) {
                    db.collection('active_task').updateOne({_id: ObjectID(result._id)},  { $set: { startDate: new Date(req.body.start_date) } } , function(err, result) {
                        assert.equal(err, null);
                    });
                }
                // if stop_date is passed in, this means we need to stop the task and push it through to completed tasks
                if(req.body.stop_date) {
                    db.collection('active_task').updateOne({_id: ObjectID(result._id)},  { $set: { stopDate: new Date(req.body.stop_date) } } , function(err, result) {
                        assert.equal(err, null);
                        db.collection('active_task').findOne({}, (err, result) => {
                            assert.equal(err, null);
                            db.collection('tasks').insertOne(result, (err, result) => {
                                assert.equal(err, null);
                                db.collection("active_task").deleteOne({}, (err, result) => {
                                    assert.equal(err, null);
                                });
                            });
                        });
                    });
                }
                res.status(200).json({message: "updated"});
            
            } else {
                res.status(400).json({message: "no active task found"});
            }
        });
    } else {
        res.status(400).json({message: "input update items are not good"});
    }
}

function getDocs(req, res){
    res.sendFile(path.join(__dirname+"/../public/index.html"));
}

module.exports = {
    getTasksByStartDate,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getActiveTask,
    createActiveTask,
    updateActiveTask,
    getDocs,
    validateTaskId
};
