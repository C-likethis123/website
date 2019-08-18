(function () {
  'use strict';

  describe('Portfolios Route Tests', function () {
    // Initialize global variables
    var $scope,
      PortfoliosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PortfoliosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PortfoliosService = _PortfoliosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('portfolios');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/portfolios');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PortfoliosController,
          mockPortfolio;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('portfolios.view');
          $templateCache.put('modules/portfolios/client/views/view-portfolio.client.view.html', '');

          // create mock Portfolio
          mockPortfolio = new PortfoliosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Portfolio Name'
          });

          // Initialize Controller
          PortfoliosController = $controller('PortfoliosController as vm', {
            $scope: $scope,
            portfolioResolve: mockPortfolio
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:portfolioId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.portfolioResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            portfolioId: 1
          })).toEqual('/portfolios/1');
        }));

        it('should attach an Portfolio to the controller scope', function () {
          expect($scope.vm.portfolio._id).toBe(mockPortfolio._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/portfolios/client/views/view-portfolio.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PortfoliosController,
          mockPortfolio;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('portfolios.create');
          $templateCache.put('modules/portfolios/client/views/form-portfolio.client.view.html', '');

          // create mock Portfolio
          mockPortfolio = new PortfoliosService();

          // Initialize Controller
          PortfoliosController = $controller('PortfoliosController as vm', {
            $scope: $scope,
            portfolioResolve: mockPortfolio
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.portfolioResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/portfolios/create');
        }));

        it('should attach an Portfolio to the controller scope', function () {
          expect($scope.vm.portfolio._id).toBe(mockPortfolio._id);
          expect($scope.vm.portfolio._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/portfolios/client/views/form-portfolio.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PortfoliosController,
          mockPortfolio;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('portfolios.edit');
          $templateCache.put('modules/portfolios/client/views/form-portfolio.client.view.html', '');

          // create mock Portfolio
          mockPortfolio = new PortfoliosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Portfolio Name'
          });

          // Initialize Controller
          PortfoliosController = $controller('PortfoliosController as vm', {
            $scope: $scope,
            portfolioResolve: mockPortfolio
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:portfolioId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.portfolioResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            portfolioId: 1
          })).toEqual('/portfolios/1/edit');
        }));

        it('should attach an Portfolio to the controller scope', function () {
          expect($scope.vm.portfolio._id).toBe(mockPortfolio._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/portfolios/client/views/form-portfolio.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
