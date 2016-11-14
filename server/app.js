// initial jokes provided by the client
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Kris",
    jokeQuestion: "How many software engineers does it take to change a lightbulb?",
    punchLine: "None! That's a hardware problem!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Friends are like snow flakes...",
    punchLine: "If you pee on them they disappear."
  }
];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/jokes', function(req, res) {
  console.log("handling jokes request");
  res.send(jokes);
});

app.post('/jokes', function (req, res) {
  console.log("REQ body: ", req.body);
  var newJoke = req.body;
  jokes.push(newJoke);
  res.sendStatus(201);
});

app.set('port', process.env.PORT || 5000);

app.get("/*", function(req, res) {
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file))
});
app.use(express.static('/public'));

app.listen(app.get('port'), function () {
  console.log("listening on port " + app.get('port'));
});
