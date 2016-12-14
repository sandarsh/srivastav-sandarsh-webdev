(function() {
    angular
        .module("eMarketApp")
        .controller("AdminDetailsController", AdminDetailsController);

    function AdminDetailsController($routeParams, $location, ItemService, AdminService) {
        var vm = this;
        vm.flag = false;
        vm.uid = $routeParams.uid;
        vm.itemId = $routeParams.itemId;

        function init() {
            ItemService
                .findById(vm.uid, vm.itemId)
                .success(function (itemObj) {
                    vm.item = itemObj;
                })
                .error(function () {
                });
        }
        init();

        vm.updateItem = updateItem;
        vm.removeItem = removeItem;

        function updateItem() {
            ItemService
                .updateItem(vm.item, vm.uid, vm.itemId)
                .success(function () {
                    $location.url("/admin/item/" + vm.itemId);
                })
                .error(function () {
                });
        }

        function removeItem() {
            ItemService
                .removeItem(vm.uid, vm.itemId)
                .success(function () {
                    $location.url("/admin/item/" + vm.itemId);
                })
                .error(function () {
                });
        }
    }
})();