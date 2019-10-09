const express = require("express");
require('./v1/models/db');
const v1Router = require('./v1/routes/router')
const morgan = require('morgan')
const bodyParser = require('body-parser');

var port = process.env.PORT || 3004;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/v1", v1Router);

app.use( (req, res) => { res.status(404).send("Page not found!"); });

app.listen(port, () => { console.log("Auth server started at localhost: "+port); });
