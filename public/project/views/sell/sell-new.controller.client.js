(function() {
    angular
        .module("eMarketApp")
        .controller("NewItemController", NewItemController);

    function NewItemController(ItemService, $routeParams, $location) {
        var vm = this;

        vm.flag = true;
        vm.uid = $routeParams.uid;

        vm.createItem = createItem;

        function createItem(item) {
            ItemService
                .createItem(vm.uid, item)
                .success(function (status) {
                    $location.url("/user/" + vm.uid + "/sell");
                })
                .error(function () {
                });
        }
    }
})();