var express   = require('express'),
bodyParser  = require('body-parser'),
cors        = require('cors'),
mongoose    = require('mongoose');

var partCtrl = require('./partCtrl');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/part', partCtrl.create);
app.get('/part', partCtrl.read);
app.put('/part/:id', partCtrl.update);
app.delete('/part/:id', partCtrl.delete);

var mongoUri = "mongodb://localhost:27017/partInventory";
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(3000, function(){
  console.log("listening to 3000");
});
