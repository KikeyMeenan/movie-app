describe('Movie Result Directive', function(){
    var result = {
        Poster: 'http://localhost/image.jpg',
        Title: 'Star Wars: Episode IV - A New Hope',
        Plot: 'This is the plot',
        Director: 'George Lucas',
        Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter cushing',
        Released: '25 May 1977',
        Genre: 'Action, Adventure, Fantasy'
    };

    var expectedHtml = [
        '<div class="col-sm-4">',
            '<img ng-src="'+result.Poster+'" alt="'+result.Title+'" width="220" src="'+result.Poster+'">',
        '</div>',
        '<div>',
            '<h3 class="ng-binding">'+result.Title+'</h3>',
            '<p class="ng-binding">'+result.Plot+'</p>',
            '<p class="ng-binding"><strong>Director:</strong>'+result.Director+'</p>',
            '<p class="ng-binding"><strong>Actors:</strong>'+result.Actors+'</p>',
            '<p class="ng-binding"><strong>Released:</strong>'+result.Released+'</p>',
            '<p class="ng-binding"><strong>Genre:</strong>'+result.Genre+'</p>',
        '</div>'
    ].join('');

    var $compile;
    var $rootScope;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should put movie result to expected HTML format', function(){
        $rootScope.result = result;
        var element;
        element = $compile('<movie-result result="result"></movie-result>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe(expectedHtml);
    });
});