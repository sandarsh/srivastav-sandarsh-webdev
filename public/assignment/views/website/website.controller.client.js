/**
 * Created by sandarshsrivastav on 16/10/16.
 */
// website._id = ((new Date().getTime() % 1000).toString());
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

    function WebsiteListController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.id = userId;
        var websiteListPromise = WebsiteService.findWebsiteByUser(userId);
        websiteListPromise
            .success(function(websites){
                vm.websites = websites;
            })
            .error(function(){
                console.log("Could not retrieve website list");
            });
    }


    function NewWebsiteController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.id = userId;
        var findWebsitesPromise = WebsiteService.findWebsiteByUser(userId);
        findWebsitesPromise
            .success(function(websites){
                vm.websites = websites;
            })
            .error(function(){
            });
        vm.newWebsite = newWebsite;
        //console.log(vm.websites);


        function newWebsite(id, name, description){
            var website = {"name" : name, "description":description};
            website._id = ((new Date().getTime() % 1000).toString());
            var createPromise = WebsiteService.createWebsite(id, website);
            createPromise
                .success(function(website){
                    //console.log(website);
                })
                .error(function(){
                    console.log("Server Error");
                });
        }

    }



    function EditWebsiteController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.id = userId;
        var siteId = $routeParams.wid;
        var findWebsitePromise = WebsiteService.findWebsiteById(siteId);
        findWebsitePromise
            .success(function(website){
                if(website!="0"){
                    vm.name = website.name;
                    vm.description = website.description;
                }
                var findWebsitesPromise = WebsiteService.findWebsiteByUser(userId);
                findWebsitesPromise
                    .success(function(websites){
                        vm.websites = websites;
                    })
                    .error(function(){
                    });
            })
            .error(function(){
            });


        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;




        function editWebsite(name, description, developerId){
            var website = {"name" : name, "description": description, "developerId": developerId};
            var updatePromise = WebsiteService.updateWebsite(siteId,website);
            updatePromise
                .success(function(website){
                    vm.name = website.name;
                    vm.description = website.description;
                })
                .error(function(){
                    console.log("Server Error");
                });
        }

        function deleteWebsite(){
            var deletePromise = WebsiteService.deleteWebsite(siteId);
            deletePromise
                .success(function(website){
                    //console.log(website);
                })
                .error(function(){
                    console.log("server error");
                });
        }
    }
})();
