var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../db').models;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;

module.exports = router;

router.post('/', function(req, res, next) {
  Region.create({
    zipcode: req.body.zipcode
  }).then(function() {
    return res.redirect('/regions');
  }).catch(next);
});

router.delete('/:id', function(req, res, next) {
  Region.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/regions');
  }).catch(next);
})

router.get('/', function(req, res, next) {
  Region.getRegionsViewModel().then(function(viewModel) {
    res.render('regions', viewModel);
  }).catch(next);
});