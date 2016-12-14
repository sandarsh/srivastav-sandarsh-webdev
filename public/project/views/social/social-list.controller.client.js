(function () {
    angular
        .module("eMarketApp")
        .controller("SocialListController", SocialListController);

    function SocialListController(SocialService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.searchUserByTitle = searchUserByTitle;
        vm.addUsersToList = addUsersToList;
        vm.getDetails = getDetails;

        function searchUserByTitle(title) {
            SocialService
                .searchUserByTitle(vm.uid, title)
                .success(function (result) {
                    vm.users = result;
                    vm.page = 0;
                    vm.viewUsers = [];
                    addUsersToList();
                })
                .error(function() {
                });
        }

        function addUsersToList() {
            if(vm.users) {
                var temp = vm.users.slice(vm.page, vm.page + 25);
                vm.page += 25;
                vm.viewUsers = vm.viewUsers.concat(temp);
            }
        }

        function getDetails(user) {
            $location.url("/user/"+ vm.uid +"/social/" + user._id);
        }
    }
})();