app.constant("APP_CONFIG", {
    //Basic config
    debugMode: true,
    storagePrefix: "test_",

    // API config
    apiKey: '4aa883f95999ec813b8bfaf319f3972b',
    apiUrl: "api.themoviedb.org/3/",
    apiEndpoints: {
        moviesPopular: "movie/popular",
        movieDetail: "movie/:id",
        movieCredits: "movie/:id/credits",
        genreList: "genre/movie/list",
        moviesByGenre: "genre/:id/movies"
    },

    getApiUrl: function (endpoint, id){
        var url = this.apiEndpoints[endpoint];
        if(id) url = url.replace(":id", id);

        return "https://" + this.apiUrl + url + '?api_key=' + this.apiKey;
    },
});
