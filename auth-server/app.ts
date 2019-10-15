const app = require('./auth-server');
var port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log('Auth server started at localhost: ' + port);
});
