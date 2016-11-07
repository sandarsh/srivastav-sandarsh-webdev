/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function(){
    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http){

        var api = {
            createWebsite : createWebsite,
            findWebsiteByUser : findWebsiteByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function createWebsite(userId,website){
            website.developerId = userId;
            var url = "/api/user/" + userId +"/website";
            return $http.post(url, website);
        }

        function findWebsiteByUser(userId){
            var url = "/api/user/"+ userId + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website){
            var url = "/api/website/"+ websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();
