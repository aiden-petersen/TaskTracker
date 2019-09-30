/* API requests
    GET /               Returns JSON object containing all finshed tasks ordered by date and grouped by day
    GET /active-task    Returns JSON object containing currently active task
    POST /              Starts a new task with "title" query passed in, also stops any currently running tasks
    PUT /               Stops an active task if one exists
*/

const express = require("express");
const path = require('path');

const router = express.Router();

const ctrlTasks = require("../controllers/tasks");

router
    .route("/tasks")
    .get(ctrlTasks.getTasksByStartDate)
    .post(ctrlTasks.createTask);

// TODO: need to add a regex into the /tasks/:taskid route so that is doesnt pick up on /task/active_task
router
    .route("/tasks/active_task")
    .get(ctrlTasks.getActiveTask)
    .post(ctrlTasks.createActiveTask)
    .put(ctrlTasks.updateActiveTask);

router
    .route("/tasks/:taskid")
    .get(ctrlTasks.getTask)
    .put(ctrlTasks.updateTask)
    .delete(ctrlTasks.deleteTask);

router
    .route("/docs")
    .get(ctrlTasks.getDocs);

module.exports = router;
