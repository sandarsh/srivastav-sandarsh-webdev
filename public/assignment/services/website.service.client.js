/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function(){
    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService(){
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" , "description": "This is a test description" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" ,"description": "This is a test description" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "This is a test description" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "This is a test description" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "This is a test description" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "This is a test description" }
        ];

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
            //console.log(website);
            websites.push(website);
        }

        function findWebsiteByUser(userId){
            var website;
            var res = [];
            for(website in websites){
                if(websites[website].developerId === userId){
                    res.push(websites[website]);
                }
            }
            return res;
        }

        function findWebsiteById(websiteId){
            var website;
            for(website in websites){
                if(websites[website]._id === websiteId){
                    return websites[website];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            //console.log(website);
            var wsite;
            for(wsite in websites) {
                if (websites[wsite]._id === websiteId) {
                    websites[wsite].name = website.name;
                    websites[wsite].developerId = website.developerId;
                    websites[wsite].description = website.description;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId){
            //console.log(websiteId);
            var website;
            var ind;
            for(website in websites){
                if(websites[website]._id === websiteId){
                    ind = website;
                    break;
                }
            }
            websites.splice(ind,1);
        }
    }
})();
