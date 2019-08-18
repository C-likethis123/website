'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Portfolio = mongoose.model('Portfolio'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Portfolio
 */
exports.create = function(req, res) {
  var portfolio = new Portfolio(req.body);
  portfolio.user = req.user;

  portfolio.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(portfolio);
    }
  });
};

/**
 * Show the current Portfolio
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var portfolio = req.portfolio ? req.portfolio.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  portfolio.isCurrentUserOwner = req.user && portfolio.user && portfolio.user._id.toString() === req.user._id.toString();

  res.jsonp(portfolio);
};

/**
 * Update a Portfolio
 */
exports.update = function(req, res) {
  var portfolio = req.portfolio;

  portfolio = _.extend(portfolio, req.body);

  portfolio.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(portfolio);
    }
  });
};

/**
 * Delete an Portfolio
 */
exports.delete = function(req, res) {
  var portfolio = req.portfolio;

  portfolio.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(portfolio);
    }
  });
};

/**
 * List of Portfolios
 */
exports.list = function(req, res) {
  Portfolio.find().sort('-created').populate('user', 'displayName').exec(function(err, portfolios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(portfolios);
    }
  });
};

/**
 * Portfolio middleware
 */
exports.portfolioByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Portfolio is invalid'
    });
  }

  Portfolio.findById(id).populate('user', 'displayName').exec(function (err, portfolio) {
    if (err) {
      return next(err);
    } else if (!portfolio) {
      return res.status(404).send({
        message: 'No Portfolio with that identifier has been found'
      });
    }
    req.portfolio = portfolio;
    next();
  });
};
