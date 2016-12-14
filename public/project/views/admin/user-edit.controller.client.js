(function() {
    angular
        .module("eMarketApp")
        .controller("AdminUserDetailsController", AdminUserDetailsController);

    function AdminUserDetailsController($routeParams, $location, AdminService, UserService) {
        var vm = this;
        vm.flag = false;
        vm.uid = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.removeUser = removeUser;

        function init() {
            UserService
                .findUserById(vm.uid)
                .success(function (userObj) {
                    vm.user = userObj;
                })
                .error(function () {
                });
        }
        init();

        function updateUser() {
            AdminService
                .updateUser(vm.user, vm.uid)
                .success(function () {
                    $location.url("/admin/user");
                })
                .error(function () {
                });
        }

        function removeUser() {
            AdminService
                .removeUser(vm.uid)
                .success(function () {
                    $location.url("/admin/user");
                })
                .error(function () {
                });
        }
    }
})();