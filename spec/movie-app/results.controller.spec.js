describe('Results Controller', function(){
    var results = {
        "Search": [
            {
                "Title": "test 1",
                "Year": "1900",
                "imdbID": "1",
                "type": "movie"
            },
            {
                "Title": "test 2",
                "Year": "1901",
                "imdbID": "2",
                "type": "movie"
            },
            {
                "Title": "test 3",
                "Year": "1902",
                "imdbID": "3",
                "type": "movie"
            }
        ]
    };

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var omdbApi;
    var $location;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _omdbApi_, _$location_){
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
        $location = _$location_;
    }));

    it('should load search results', function(){
        //set up mock api
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {$scope: $scope});
        //resolve promise
        $rootScope.$apply();
        //check results
        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should return an error', function(){
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {$scope: $scope});
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Something went wrong!');
    });
});