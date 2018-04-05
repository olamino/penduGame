const configUrl = "http://localhost:8088/config.json";

class PlayService {

    /**
     *
     * @param {Object} $http
     */
    constructor($http) {
        this.$http = $http;
    }

    getConfig() {
        return this.$http
            .get(configUrl)
            .then(response => {
                return response.data;
            });
    }

    static PlayFactory($http) {
        return new PlayService($http);
    }
}

PlayService.PlayFactory.$inject = ['$http'];

export default PlayService.PlayFactory;