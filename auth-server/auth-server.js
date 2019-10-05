
const express = require("express");
const v1Router = require('./routes/v1')
const morgan = require('morgan')
const bodyParser = require('body-parser');

var port = process.env.PORT || 3004;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/v1", v1Router);

app.use( (req, res) => { res.status(404).send("Page not found!"); });

app.listen(port, () => { console.log("Auth server started at localhost: "+port); });
