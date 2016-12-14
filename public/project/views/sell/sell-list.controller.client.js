(function () {
    angular
        .module("eMarketApp")
        .controller("ItemSaleController", ItemSaleController);

    function ItemSaleController(ItemService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        function init() {
            ItemService
                .searchAllItemsForSale(vm.uid)
                .success(function (result) {
                    if(result == "0") {
                        vm.error = "No items uploaded.";
                    }
                    else {
                        vm.items = result;
                    }
                })
                .error(function() {
                });
        }
        init();
    }
})();