
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import v1Router from './v1/routes/router';

var port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  
app.use("/v1/api", v1Router);

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

module.exports = app.listen(port, () => {
  console.log('task server started at localhost: ' + port);
});
