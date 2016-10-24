/**
 * Created by sandarshsrivastav on 16/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController)

    function PageListController($routeParams, PageService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
        //console.log(vm.pages);

    }

    function NewPageController($routeParams, PageService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
        vm.newPage = newPage;
        //console.log(vm.pages);

        function newPage(name, title){
            var id = ((new Date().getTime() % 1000).toString());
            var page = {"name":name, "title":title, _id:id};
            PageService.createPage(vm.wid,page);
        }

    }

    function EditPageController($routeParams, PageService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.editPage = editPage;
        vm.deletePage = deletePage;

        var page = PageService.findPageById(vm.pid);
        if(page!=null){
            vm.name = page.name;
            vm.title = page.title;
        }

        function editPage(name, title){
            var page = {"name":name, "title":title, "websiteId" : vm.wid};
            PageService.updatePage(vm.pid,page);
        }

        function deletePage(){
            PageService.deletePage(vm.pid);
        }
    }
})();
