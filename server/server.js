import Express from 'express';
const app = new Express();
const port = 8080;

app.use(setHeaders);
app.use('/', Express.static(__dirname + '/../src'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

//-----------------------------------------------------------------------------------
function setHeaders(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
//-----------------------------------------------------------------------------------

app.listen(port, () => {
  console.log('✔ Server listening on port ' + port);
});
