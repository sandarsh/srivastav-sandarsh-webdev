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
        var pageListPromise = PageService.findPageByWebsiteId(vm.wid);
        pageListPromise
            .success(function(pages){
                vm.pages = pages;
            })
            .error(function(){
                console.log("Server error");
            });
    }


    function NewPageController($routeParams, PageService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        var pageListPromise = PageService.findPageByWebsiteId(vm.wid);
        pageListPromise
            .success(function(pages){
                vm.pages = pages;
            })
            .error(function(){
                console.log("Server error");
            });

        vm.newPage = newPage;
        //console.log(vm.pages);

        function newPage(name, title){
            // var id = ((new Date().getTime() % 1000).toString());
            var page = {"name":name, "title":title};
            var createPagePromise = PageService.createPage(vm.wid,page);
            createPagePromise
                .success(function(page){
                    console.log(page);
                })
                .error(function(){
                    console.log("Server error in creating page");
                });
        }

    }








    function EditPageController($routeParams, PageService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.editPage = editPage;
        vm.deletePage = deletePage;



        var pageByIdPromise = PageService.findPageById(vm.pid);
        pageByIdPromise
            .success(function(page){
                if(page!="0"){
                    vm.name = page.name;
                    vm.title = page.title;
                }
            })
            .error(function(){
                console.log("Server error!");
            });


        function editPage(name, title){
            var page = {"name":name, "title":title};
            var editPagePromise = PageService.updatePage(vm.pid,page);
            editPagePromise
                .success(function(page){
                    console.log(page);
                })
                .error(function(){
                    console.log("Server error");
            });
        }

        function deletePage(){
            var deletePagePromise = PageService.deletePage(vm.pid);
            deletePagePromise
                .success(function(page){
                   console.log(page)
                })
                .error(function(){
                    console.log("Could not delete page. Server error.")
                });
        }
    }






})();
