
const express = require("express");
const apiRouter = require("./api/routes/index");
var cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use("/api", apiRouter);
app.use("/api", express.static(path.join(__dirname, 'api/public')));


app.use( (req, res) => {
    res.status(404).send("Page not found!");
});

app.listen(3003, () => {
    console.log("TaskTracker app started at localhost:3000\n");
});
