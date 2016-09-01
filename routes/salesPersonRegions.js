var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../db').models;
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;

module.exports = router;

router.post('/:salesPersonId/:regionId', function(req, res, next) {
  SalesPersonRegion.create({
    salesPersonId: req.params.salesPersonId,
    regionId: req.params.regionId
  }).then(function() {
    res.redirect('/' + req.query.backUrl);
  }).catch(next);
});

router.delete('/:salesPersonId/:regionId', function(req, res, next) {
  SalesPersonRegion.destroy({
    where: {
      salesPersonId: req.params.salesPersonId,
      regionId: req.params.regionId
    }
  }).then(function() {
    res.redirect('/' + req.query.backUrl);
  }).catch(next);
})