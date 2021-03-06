var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

var Region = db.define('region', {
  zipcode: Sequelize.STRING
}, {
  classMethods: {
    getRegionsViewModel: function() {
      return Promise.all([
        SalesPerson.findAll(),
        Region.findAll({
          include: [SalesPersonRegion]
        })
      ]).spread(function(salesPeople, regions) {
        return {
          title: 'Regions',
          currentpage: 'regions',
          salesPeople: salesPeople,
          regions: regions
        }
      }).catch(function(err) {
        throw err;
      });
    }
  },
  instanceMethods: {
    hasSalesPerson: function(salesPersonId) {
      var assigned = false;
      for (var i = 0; i < this.salesPersonRegions.length; i++) {
        if (this.salesPersonRegions[i].salesPersonId === salesPersonId) {
          assigned = true;
        }
      }
      return assigned;
    }
  }
});

var SalesPerson = db.define('salesPerson', {
  name: Sequelize.STRING
}, {
  classMethods: {
    getSalesPersonViewModel: function() {
      return Promise.all([
        SalesPerson.findAll({
          include: [SalesPersonRegion]
        }),
        Region.findAll()
      ]).spread(function(salesPeople, regions) {
        return {
          title: 'Sales People',
          currentpage: 'salesPeople',
          salesPeople: salesPeople,
          regions: regions
        }
      }).catch(function(err) {
        throw err;
      });
    }
  },
  instanceMethods: {
    hasRegion: function(regionId) {
      var assigned = false;
      for (var i = 0; i < this.salesPersonRegions.length; i++) {
        if (this.salesPersonRegions[i].regionId === regionId) {
          assigned = true;
        }
      }
      return assigned;
    }
  }
});

var SalesPersonRegion = db.define('salesPersonRegion', {});

Region.hasMany(SalesPersonRegion);
SalesPerson.hasMany(SalesPersonRegion);
SalesPersonRegion.belongsTo(Region);
SalesPersonRegion.belongsTo(SalesPerson);

function sync() {
  return db.sync({
    force: true
  });
}

module.exports = {
  sync: sync,
  models: {
    Region: Region,
    SalesPerson: SalesPerson,
    SalesPersonRegion: SalesPersonRegion
  }
}