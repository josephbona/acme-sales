var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({cache: false });
var models = require('./db').models;

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;

app.get('/', function(req, res, next){
  res.render('index', {
    title: 'Acme Sales',
    currentpage: 'home'
  });
});

app.use('/regions', require('./routes/regions'));
app.use('/salesPeople', require('./routes/salesPeople'));
app.use('/salesPersonRegions', require('./routes/salesPersonRegions'));