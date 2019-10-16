const express = require("express");
const express_jwt = require('express-jwt');
const fs = require('file-system');


const router = express.Router();

const ctrlTasks = require("../controllers/tasks");

if(!process.env.JWT_PUBLIC_PATH)
{
    // No secret, we cannot proceed
    // TODO: need a better way to handle these fatal errors
    // console.log might not get printed
    console.log("Error: JWT_PUBLIC_PATH environment variable needs to be set");
    process.exit(1);
}
const public_key = fs.readFileSync(process.env.JWT_PUBLIC_PATH, 'utf8');

// TODO: move docs somewhere else
router
    .route("/docs")
    .get(ctrlTasks.getDocs);

router
    .route("/tasks")
    .all(express_jwt({secret: public_key}))
    .get(ctrlTasks.getTasksByStartDate)
    .post(ctrlTasks.createTask);

// TODO: need to add a regex into the /tasks/:taskid route so that is doesnt pick up on /task/active_task
// inactive for now
// router
//     .route("/tasks/active_task")
//     .get(ctrlTasks.getActiveTask)
//     .post(ctrlTasks.createActiveTask)
//     .put(ctrlTasks.updateActiveTask);

router
    .param('taskid', ctrlTasks.validateTaskId)
    .route("/tasks/:taskid")
    .all(express_jwt({secret: public_key}))
    .get(ctrlTasks.getTask)
    .put(ctrlTasks.updateTask)
    .delete(ctrlTasks.deleteTask);

module.exports = router;
