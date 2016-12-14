(function () {
    angular
        .module("eMarketApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            // searchUserByTitle: searchUserByTitle,
            // findUserById: findUserById,
            fetchAllItems: fetchAllItems,
            fetchAllUsers: fetchAllUsers,
            removeUser: removeUser,
            updateUser: updateUser
        };
        return api;

        function fetchAllUsers() {
            var url = "/api/admin/user";
            return $http.get(url);
        }

        function fetchAllItems() {
            var url = "/api/admin/item";
            return $http.get(url);
        }

        function updateUser(user, uid) {
            var url = '/api/admin/user/' + uid;
            return $http.put(url, user);
        }

        function removeUser(uid) {
            var url = '/api/admin/user/' + uid;
            return $http.delete(url);
        }

        // function findUserById(uid) {
        //     var url = "/api/user/" + uid;
        //     return $http.get(url);
        // }
        //
        // function searchUserByTitle(uid, title) {
        //     var url = "/api/user/" + uid + "/social/?title=" + title;
        //     return $http.get(url);
        // }
    }
})();