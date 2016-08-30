var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../db').models;
var SalesPerson = models.SalesPerson;
var SalesPersonRegion = models.SalesPersonRegion;

module.exports = router;

router.post('/', function(req, res, next) {
  SalesPerson.create({
    name: req.body.name
  }).then(function() {
    return res.redirect('/salesPeople');
  }).catch(next);
});

router.delete('/:id', function(req, res, next) {
  SalesPerson.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    return res.redirect('/salesPeople');
  }).catch(next);
})

router.get('/', function(req, res, next) {
  SalesPerson.getSalesPersonViewModel().then(function(viewModel) {
    return res.render('salesPeople', viewModel);
  }).catch(next);
});