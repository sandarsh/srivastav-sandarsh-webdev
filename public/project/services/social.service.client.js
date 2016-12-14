(function () {
    angular
        .module("eMarketApp")
        .factory("SocialService", SocialService);

    function SocialService($http) {
        var api = {
            searchUserByTitle: searchUserByTitle,
            findUserById: findUserById,
            followUser: followUser,
            getFollowers: getFollowers,
            getFollowing: getFollowing
        };
        return api;

        function findUserById(uid) {
            var url = "/api/user/" + uid;
            return $http.get(url);
        }

        function searchUserByTitle(uid, title) {
            var url = "/api/user/" + uid + "/social/?title=" + title;
            return $http.get(url);
        }

        function followUser(uid1, uid2) {
            var url = "/api/user/" + uid1 + "/social/" + uid2;
            return $http.put(url);
        }

        function getFollowers(uid) {
            var url = "/api/user/" + uid + "/social/followers";
            return $http.get(url);
        }

        function getFollowing(uid) {
            var url = "/api/user/" + uid + "/social/following";
            return $http.get(url);
        }
    }
})();