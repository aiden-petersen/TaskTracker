
const express = require("express");
const apiRouter = require("./routes/index");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const path = require('path');

var port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  
app.use("/api", apiRouter);
// app.use('/api', (req, res, next) => { 
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3003');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ➥ Content-Type, Accept, Authorization');
//     next();
// });

// For documentation
app.use("/api", express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res
        .status(401)
        .json({"message" : err.name + ": " + err.message});
    }
});

app.use( (req, res) => { res.status(404).send("Page not found!"); });

app.listen(port, () => { console.log("TaskTracker app started at localhost: "+port); });
