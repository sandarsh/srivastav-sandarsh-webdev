(function () {
    angular
        .module("eMarketApp")
        .controller("PersonalItemsController", PersonalItemsController);

    function PersonalItemsController(UserService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.addUsersToList = addUsersToList;
        vm.getDetails = getDetails;

        var type = $routeParams.type == "1";

        if(type)
            vm.itemType = "My Cart Items";
        else
            vm.itemType = "Items searched in the past";

        function init() {
            UserService
                .getUserItems(vm.uid, type)
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
            $location.url("/user/"+ vm.uid +"/details/item/list/"+$routeParams.type+"/" + item._id);
        }
    }
})();