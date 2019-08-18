'use strict';

describe('Portfolios E2E Tests:', function () {
  describe('Test Portfolios page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/portfolios');
      expect(element.all(by.repeater('portfolio in portfolios')).count()).toEqual(0);
    });
  });
});
