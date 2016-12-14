var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = 'Ignit the World';
});

app.listen(3000);
