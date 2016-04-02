app.factory("MoviesGenresService", function (APP_CONFIG, $http, $q) {
    return new (function () {
        var service = this;
        service.data = {};
        service.data.genresMovies = [];

        /**
         * @description Fetch genre list from API
         */
        service.fetchGenreList = function () {
            var req = {
                method: "GET",
                url: APP_CONFIG.getApiUrl("genreList"),
            }

            return $http(req).then(function (response) {
                if (!response.data.genres) {
                    console.error('error - no genre list data in response', response);
                    return $q.reject(response.data.genres);
                }
                console.log('call successful', response.data.genres);
                return response.data.genres;
            }, function (error) {
                console.error('error', error);
                return $q.reject(error);
            });
        }

        /**
         * @description Return page of 20 movies by genre id
         * @param {int} genre id
         * @param {int} page number
         */
        service.fetchMoviesByGenre = function (genre, page) {
            var page = page || 1;

            var req = {
                method: "GET",
                url: APP_CONFIG.getApiUrl("moviesByGenre", genre) + '&page=' + page
            }

            return $http(req).then(function (response) {
                if (!response.data.results) {
                    console.error('error - no movies data in response', response);
                    return $q.reject(response.data);
                }
                console.log('call successful', response.data);
                return response.data.results;
            }, function (error) {
                console.error('error', error);
                return $q.reject(error);
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
         * @description Return array of movies by genre id
         * @param {int} genre id
         */
        service.getMoviesByGenre = function (genre) {
            return new Promise(function (resolve, reject) {
                if (typeof service.data.genresMovies[genre] === 'undefined') {
                    service.fetchMoviesByGenre(genre).then(function (result) {
                        service.data.genresMovies[genre] = result;
                        console.log('promise', service.data.genresMovies);
                        resolve(service.data.genresMovies[genre]);
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