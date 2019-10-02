const express = require("express");
const router = express.Router();

const ctrlTasks = require("../controllers/tasks");
const ctrlAuth = require("../controllers/authentication");

// TODO: update to be part of another service
router.route("/login").post(ctrlAuth.login);
router.route("/register").post(ctrlAuth.register);

// TODO: move docs somewhere else
router
    .route("/docs")
    .get(ctrlTasks.getDocs);

router
    .route("/tasks")
    .all(ctrlAuth.auth)
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
    .all(ctrlAuth.auth)
    .get(ctrlTasks.getTask)
    .put(ctrlTasks.updateTask)
    .delete(ctrlTasks.deleteTask);

module.exports = router;
