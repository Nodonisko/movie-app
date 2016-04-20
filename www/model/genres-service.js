app.factory("MoviesGenresService", function (APP_CONFIG, $http, $q, $resource) {
    return new (function () {
        var service = this;
        service.data = {};
        service.data.genresMovies = [];

        /**
         * @description Fetch genre list from API
         */
        service.fetchGenreList = function () {
            return $resource(APP_CONFIG.getApiUrl("genreList"), {}, {
                query: {
                    isArray: false
                }
            }).query().$promise.then(function(result){
                console.log(result);
                return result.genres;
            });
        }

        /**
         * @description Return page of 20 movies by genre id
         * @param {int} genre id
         * @param {int} page number
         */
        service.fetchMoviesByGenre = function (genre, page) {
            var page = page || 1;

            return $resource(APP_CONFIG.getApiUrl("moviesByGenre", genre) + '&page=' + page, {}, {
                query: {
                    isArray: false
                }
            }).query().$promise.then(function (result) {
                console.log(result.results);
                return result.results;
            });
        }

        /**
         * @description Return array of all genres
         */
        service.getGenres = function () {
            return new Promise(function (resolve, reject) {
                if (typeof service.data.genres === 'undefined') {
                    service.fetchGenreList().then(function (result) {
                        service.data.genres = result;
                        resolve(service.data.genres);
                    }).catch(function (error) {
                        console.log(error);
                        reject(error);
                    });
                } else {
                    resolve(service.data.genres);
                }
            });
        }

        /**
         * @description Return promise array of movies by genre id
         * @param {int} genre id
         */
        service.getMoviesByGenre = function (genre) {
            return new Promise(function (resolve, reject) {
                if (typeof service.data.genresMovies[genre] === 'undefined') {
                    service.fetchMoviesByGenre(genre).then(function (result) {
                        service.data.genresMovies[genre] = result;
                        resolve(result);
                    }).catch(function (error) {
                        console.log(error);
                        reject(error);
                    });
                } else {
                    resolve(service.data.genresMovies[genre]);
                }
            });
        }
    })
});