app.factory("MoviesService", function (APP_CONFIG, $http, $q, $resource) {
    return new (function () {
        var service = this;

        service.data = {};
        service.watchedMovies = [];
        service.actualPage = 0;

        /**
         * @description Return page of 20 popular movies
         * @param {int} page number
         */
        service.fetchMovies = function (page) {
            var page = page || 1;

            //if(page >= 5) return $q.reject('no more pages allowed');

            return $resource(APP_CONFIG.getApiUrl("moviesPopular") + '&page=' + page, {}, {
                query: {
                    isArray: false
                }
            }).query().$promise.then(function (result) {
                console.log(result.results);
                return result.results;
            });
        }

        /**
         * @description Fetch movie details from API by ID
         * @param {int} movie id
         */
        service.fetchMovieDetail = function (id) {
            return $resource(APP_CONFIG.getApiUrl("movieDetail", id) + "&append_to_response=credits,images", {}, {
                query: {
                    isArray: false
                }
            }).query().$promise;
        }

        /**
         * @description Return array of all movies
         */
        service.getMovies = function () {
            if (typeof service.data.movies === 'undefined') {
                return service.data.movies = [];
            }
            return service.data.movies;
        }

        /**
         * @description Load next page of movies and return list of all popular movies
         */
        service.getMoreMovies = function () {
            var nextPage = service.actualPage + 1;
            return service.fetchMovies(nextPage).then(function (result) {
                service.actualPage = nextPage;
                return service.addMovies(result);
            });
        }


        /**
         * @description Add movies to array of all movies and return list of popular movies
         * @param {array} movies
         */
        service.addMovies = function (newMovies) {
            return service.data.movies = service.getMovies().concat(newMovies);
        }

        /**
         * @description Return movie details
         * @param {int} movie id
         */
        service.getMovieById = function (id) {
            return service.fetchMovieDetail(id);
        }

        /**
         * @description Load all watched movies
         */
        service.getWatchedMoviesFromStorage = function () {
            try {
                service.watchedMovies = JSON.parse(localStorage.getItem("watched_movies")) || [];
            } catch (e) {
                console.warn("BAD JSON", e);
            }
        }

        /**
         * @description Add or remove movie from watched
         * @param {int} movie id
         */
        service.toggleWatched = function (id) {
            var occurenceIndex = service.watchedMovies.indexOf(id);
            if (~occurenceIndex) {
                service.watchedMovies.splice(occurenceIndex, 1);
            } else {
                service.watchedMovies.push(+id);
            }

            localStorage.setItem("watched_movies", JSON.stringify(service.watchedMovies));
        }

        /**
         * @description Return true if movie is watched
         * @param {int} movie id
         */
        service.isMovieWatched = function (movieId) {
            return !!~service.watchedMovies.indexOf(movieId);
        }

        service.getWatchedMoviesFromStorage();
    })();
});