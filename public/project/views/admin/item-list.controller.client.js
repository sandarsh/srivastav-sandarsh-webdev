(function () {
    angular
        .module("eMarketApp")
        .controller("AdminItemController", AdminItemController);

    function AdminItemController(AdminService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.addUsersToList = addUsersToList;
        vm.getDetails = getDetails;

        function init() {
            AdminService
                .fetchAllItems()
                .success(function (result) {
                    vm.items = result;
                    vm.page = 0;
                    vm.viewItems = [];
                    addUsersToList();
                })
                .error(function() {
                });
        }
        init();

        function addUsersToList() {
            if(vm.items) {
                var temp = vm.items.slice(vm.page, vm.page + 25);
                vm.page += 25;
                vm.viewItems = vm.viewItems.concat(temp);
            }
        }

        function getDetails(item) {
            $location.url("/admin/item/" + item._id);
        }
    }
})();