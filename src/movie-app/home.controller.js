angular.module('movieApp')
    .controller('HomeController', function($scope, $interval, $exceptionHandler, $log, omdbApi, PopularMovies){
        $log.log('standard');
        $log.info('info');
        $log.error('error');
        $log.warn('warn');
        $log.debug('debug');

        var results = [];
        var idx = 0;

        var findMovie = function(id){
            omdbApi.find(id)
                .then(function(data){
                    $scope.result = data;
                })
                .catch(function(e){
                    $exceptionHandler(e);
                });
        };

        PopularMovies.get()
            .then(function(data){
                results = data;
                findMovie(results[0]);
                $interval(function(){
                    ++idx;
                    findMovie(results[idx % results.length]);
                }, 5000);
            });

        // var data = ['tt0076759', 'tt0080684', 'tt0086190'];
        // results = data;
        // findMovie(results[0]);
        // $interval(function(){
        //     ++idx;
        //     findMovie(results[idx % results.length]);
        // }, 5000);
    });