(function () {
    angular
        .module("eMarketApp")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController(AdminService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.addUsersToList = addUsersToList;
        vm.getDetails = getDetails;

        function init() {
            AdminService
                .fetchAllUsers()
                .success(function (result) {
                    vm.users = result;
                    vm.page = 0;
                    vm.viewUsers = [];
                    addUsersToList();
                })
                .error(function() {
                });
        }
        init();

        function addUsersToList() {
            if(vm.users) {
                var temp = vm.users.slice(vm.page, vm.page + 25);
                vm.page += 25;
                vm.viewUsers = vm.viewUsers.concat(temp);
            }
        }

        function getDetails(user) {
            $location.url("/admin/user/" + user._id);
        }
    }
})();