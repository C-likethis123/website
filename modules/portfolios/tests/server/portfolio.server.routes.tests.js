'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Portfolio = mongoose.model('Portfolio'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  portfolio;

/**
 * Portfolio routes tests
 */
describe('Portfolio CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Portfolio
    user.save(function () {
      portfolio = {
        name: 'Portfolio name'
      };

      done();
    });
  });

  it('should be able to save a Portfolio if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Portfolio
        agent.post('/api/portfolios')
          .send(portfolio)
          .expect(200)
          .end(function (portfolioSaveErr, portfolioSaveRes) {
            // Handle Portfolio save error
            if (portfolioSaveErr) {
              return done(portfolioSaveErr);
            }

            // Get a list of Portfolios
            agent.get('/api/portfolios')
              .end(function (portfoliosGetErr, portfoliosGetRes) {
                // Handle Portfolios save error
                if (portfoliosGetErr) {
                  return done(portfoliosGetErr);
                }

                // Get Portfolios list
                var portfolios = portfoliosGetRes.body;

                // Set assertions
                (portfolios[0].user._id).should.equal(userId);
                (portfolios[0].name).should.match('Portfolio name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Portfolio if not logged in', function (done) {
    agent.post('/api/portfolios')
      .send(portfolio)
      .expect(403)
      .end(function (portfolioSaveErr, portfolioSaveRes) {
        // Call the assertion callback
        done(portfolioSaveErr);
      });
  });

  it('should not be able to save an Portfolio if no name is provided', function (done) {
    // Invalidate name field
    portfolio.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Portfolio
        agent.post('/api/portfolios')
          .send(portfolio)
          .expect(400)
          .end(function (portfolioSaveErr, portfolioSaveRes) {
            // Set message assertion
            (portfolioSaveRes.body.message).should.match('Please fill Portfolio name');

            // Handle Portfolio save error
            done(portfolioSaveErr);
          });
      });
  });

  it('should be able to update an Portfolio if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Portfolio
        agent.post('/api/portfolios')
          .send(portfolio)
          .expect(200)
          .end(function (portfolioSaveErr, portfolioSaveRes) {
            // Handle Portfolio save error
            if (portfolioSaveErr) {
              return done(portfolioSaveErr);
            }

            // Update Portfolio name
            portfolio.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Portfolio
            agent.put('/api/portfolios/' + portfolioSaveRes.body._id)
              .send(portfolio)
              .expect(200)
              .end(function (portfolioUpdateErr, portfolioUpdateRes) {
                // Handle Portfolio update error
                if (portfolioUpdateErr) {
                  return done(portfolioUpdateErr);
                }

                // Set assertions
                (portfolioUpdateRes.body._id).should.equal(portfolioSaveRes.body._id);
                (portfolioUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Portfolios if not signed in', function (done) {
    // Create new Portfolio model instance
    var portfolioObj = new Portfolio(portfolio);

    // Save the portfolio
    portfolioObj.save(function () {
      // Request Portfolios
      request(app).get('/api/portfolios')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Portfolio if not signed in', function (done) {
    // Create new Portfolio model instance
    var portfolioObj = new Portfolio(portfolio);

    // Save the Portfolio
    portfolioObj.save(function () {
      request(app).get('/api/portfolios/' + portfolioObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', portfolio.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Portfolio with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/portfolios/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Portfolio is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Portfolio which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Portfolio
    request(app).get('/api/portfolios/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Portfolio with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Portfolio if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Portfolio
        agent.post('/api/portfolios')
          .send(portfolio)
          .expect(200)
          .end(function (portfolioSaveErr, portfolioSaveRes) {
            // Handle Portfolio save error
            if (portfolioSaveErr) {
              return done(portfolioSaveErr);
            }

            // Delete an existing Portfolio
            agent.delete('/api/portfolios/' + portfolioSaveRes.body._id)
              .send(portfolio)
              .expect(200)
              .end(function (portfolioDeleteErr, portfolioDeleteRes) {
                // Handle portfolio error error
                if (portfolioDeleteErr) {
                  return done(portfolioDeleteErr);
                }

                // Set assertions
                (portfolioDeleteRes.body._id).should.equal(portfolioSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Portfolio if not signed in', function (done) {
    // Set Portfolio user
    portfolio.user = user;

    // Create new Portfolio model instance
    var portfolioObj = new Portfolio(portfolio);

    // Save the Portfolio
    portfolioObj.save(function () {
      // Try deleting Portfolio
      request(app).delete('/api/portfolios/' + portfolioObj._id)
        .expect(403)
        .end(function (portfolioDeleteErr, portfolioDeleteRes) {
          // Set message assertion
          (portfolioDeleteRes.body.message).should.match('User is not authorized');

          // Handle Portfolio error error
          done(portfolioDeleteErr);
        });

    });
  });

  it('should be able to get a single Portfolio that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Portfolio
          agent.post('/api/portfolios')
            .send(portfolio)
            .expect(200)
            .end(function (portfolioSaveErr, portfolioSaveRes) {
              // Handle Portfolio save error
              if (portfolioSaveErr) {
                return done(portfolioSaveErr);
              }

              // Set assertions on new Portfolio
              (portfolioSaveRes.body.name).should.equal(portfolio.name);
              should.exist(portfolioSaveRes.body.user);
              should.equal(portfolioSaveRes.body.user._id, orphanId);

              // force the Portfolio to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Portfolio
                    agent.get('/api/portfolios/' + portfolioSaveRes.body._id)
                      .expect(200)
                      .end(function (portfolioInfoErr, portfolioInfoRes) {
                        // Handle Portfolio error
                        if (portfolioInfoErr) {
                          return done(portfolioInfoErr);
                        }

                        // Set assertions
                        (portfolioInfoRes.body._id).should.equal(portfolioSaveRes.body._id);
                        (portfolioInfoRes.body.name).should.equal(portfolio.name);
                        should.equal(portfolioInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Portfolio.remove().exec(done);
    });
  });
});
