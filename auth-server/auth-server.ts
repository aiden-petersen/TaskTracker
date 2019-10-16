import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
require('./v1/models/db');
import v1Router from './v1/routes/router';

var port = process.env.PORT || 3004;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/v1", v1Router);

app.use( (req, res) => { res.status(404).send("Page not found!"); });

app.listen(port, () => { console.log("Auth server started at localhost: "+port); });
