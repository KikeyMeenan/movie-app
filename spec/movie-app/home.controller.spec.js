describe('Home Controller', function(){
    var results = [
        {
            "Title": "Star Wars: Episode IV - A New Hope",
            "imdb": "tt0076759"
        },
        {
            "Title": "Star Wars: Episode V - The Empire strikes Back",
            "imdb": "tt0080684"
        },
        {
            "Title": "Star Wars: Episode VI - Return of the Jedi",
            "imdb": "tt0086190"
        }
    ];

    var $scope;
    var $interval;
    var $q;
    var $controller;
    var $rootScope;
    var omdbApi;
    var PopularMovies;
    var $exceptionHandler;
    var $log;

    beforeEach(module('movieApp'));

    beforeEach(module(function($logProvider){
        $logProvider.debugEnabled(true);
    }));

    beforeEach(module(function($exceptionHandlerProvider){
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function(_$q_, _omdbApi_){
        spyOn(_omdbApi_, 'find').and.callFake(function(){
            var deferred = _$q_.defer();
            var args = _omdbApi_.find.calls.mostRecent().args[0];
            if(args === 'tt0076759'){
                deferred.resolve(results[0]);
            }
            else if(args === 'tt0080684'){
                deferred.resolve(results[1]);
            }
            else if(args === 'tt0086190'){
                deferred.resolve(results[2]);
            }
            else if(args === 'ttError'){
                deferred.reject('error finding movie');
            }
            else {
                deferred.reject();
            }
            return deferred.promise;
        });
    }));

    beforeEach(inject(function(_$controller_, _$interval_, _$q_, _$exceptionHandler_, _$log_, _$rootScope_, _omdbApi_, _PopularMovies_){
        $scope = {};
        $interval = _$interval_;
        $q = _$q_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $exceptionHandler = _$exceptionHandler_;
        $log = _$log_;
        omdbApi = _omdbApi_;
        PopularMovies = _PopularMovies_;
    }));

    it('should rotate movies every 5 seconds', function(){
        spyOn(PopularMovies, 'query').and.callFake(function(cb){
            cb(['tt0076759', 'tt0080684', 'tt0086190']);
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);

        expect($log.debug.logs[0]).toEqual(['debug']);
    });

    it('should handle errors', function(){
        spyOn(PopularMovies, 'query').and.callFake(function(cb){
            cb(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);

        expect($exceptionHandler.errors).toEqual(['error finding movie']);
    });
});