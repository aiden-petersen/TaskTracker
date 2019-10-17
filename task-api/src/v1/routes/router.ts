import fs from 'fs';
import jwt from 'express-jwt';
import Router from 'express';


const ctrlTasks = require("../controllers/tasks");

let pubKey: string = "";
if (!process.env.JWT_PUBLIC_PATH) {
    // No public key, we cannot proceed
    // TODO: need a better way to handle these fatal errors
    // console.log might not get printed
    console.log('Error: JWT_PUBLIC_PATH environment variable needs to be set');
    process.exit(1);
} else {
    const publicKeyPath: string = process.env.JWT_PUBLIC_PATH;
    pubKey = fs.readFileSync(publicKeyPath, 'utf8');
}
console.log(pubKey);
// Needs to be a 256 bit priv key generated by openssl
const router = Router();

router
.route("/tasks")
.all(jwt({secret: pubKey}))
.get(ctrlTasks.getTasksByStartDate)
.post(ctrlTasks.createTask);

router
.param('taskid', ctrlTasks.validateTaskId)
.route("/tasks/:taskid")
.all(jwt({secret: pubKey}))
.get(ctrlTasks.getTask)
.put(ctrlTasks.updateTask)
.delete(ctrlTasks.deleteTask);

export default router;