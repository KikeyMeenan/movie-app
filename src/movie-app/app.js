angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb', 'movieCore', 'ngMockE2E'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'movie-app/home.html',
                controller: 'HomeController'
            })
            .when('/results', {
                templateUrl: 'movie-app/results.html',
                controller: 'ResultsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function($logProvider){
        $logProvider.debugEnabled(false);
    })
    .run(function($httpBackend){
        var data = ['tt0076759', 'tt0080684', 'tt0086190'];
        var headers = {
            headers: {'Content-Type': 'application/json'}
        };

        $httpBackend.whenGET(function(s){
            return (s.indexOf('popular') !== -1);
        }).respond(200, data, headers);

        $httpBackend.whenGET(/.*/).passThrough();
    });