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
        vm.websites = WebsiteService.findWebsiteByUser(userId);
        //console.log(vm.websites);

    }

    function NewWebsiteController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.id = userId;
        vm.websites = WebsiteService.findWebsiteByUser(userId);
        vm.newWebsite = newWebsite;
        //console.log(vm.websites);

        function newWebsite(id, name, description){
            var website = {"name" : name, "description":description};
            website._id = ((new Date().getTime() % 1000).toString());
            //console.log(website._id);
            WebsiteService.createWebsite(id, website);
        }

    }

    function EditWebsiteController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.id = userId;
        var siteId = $routeParams.wid;
        var website = WebsiteService.findWebsiteById(siteId);

        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

        if(website!=null){
            vm.name = website.name;
            vm.description = website.description;
        }
        vm.websites = WebsiteService.findWebsiteByUser(userId);

        function editWebsite(name, description, developerId){
            var website = {"name" : name, "description": description, "developerId": developerId};
            WebsiteService.updateWebsite(siteId,website);
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(siteId);
        }
    }
})();
