'use strict';

/**
 * Module dependencies
 */
var portfoliosPolicy = require('../policies/portfolios.server.policy'),
  portfolios = require('../controllers/portfolios.server.controller');

module.exports = function(app) {
  // Portfolios Routes
  app.route('/api/portfolios').all(portfoliosPolicy.isAllowed)
    .get(portfolios.list)
    .post(portfolios.create);

  app.route('/api/portfolios/:portfolioId').all(portfoliosPolicy.isAllowed)
    .get(portfolios.read)
    .put(portfolios.update)
    .delete(portfolios.delete);

  // Finish by binding the Portfolio middleware
  app.param('portfolioId', portfolios.portfolioByID);
};
