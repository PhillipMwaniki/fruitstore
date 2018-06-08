let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let fruitsRouter = require('./app/routes/fruits.js');

mongoose.connect("mongodb://phillip:!23qweASD@ds247310.mlab.com:47310/fruitstore");
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));

//don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.use('/fruits', fruitsRouter);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
