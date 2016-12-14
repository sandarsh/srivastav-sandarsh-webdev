(function () {
    angular
        .module("eMarketApp")
        .controller("ItemSearchController", ItemSearchController);

    function ItemSearchController(ItemService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.searchItemByTitle = searchItemByTitle;
        vm.addItemsToList = addItemsToList;
        vm.getDetails = getDetails;
        vm.title = $routeParams.title;
        vm.error = "No Results Found.";

        function init() {
            if(vm.title) {
                searchItemByTitle(vm.title);
            }
        }
        init();

        function searchItemByTitle(title) {
            ItemService
                .searchItemByTitle(vm.uid, title)
                .success(function (result) {
                    if (result.findItemsByKeywordsResponse[0].searchResult[0]['@count'] == "0") {
                        vm.flag = true;
                    }
                    else {
                        vm.flag = false;
                        vm.items = result.findItemsByKeywordsResponse[0].searchResult[0].item;
                        vm.page = 0;
                        vm.viewItems = [];
                        addItemsToList();
                    }
                })
                .error(function() {
                });
        }

        function addItemsToList() {
            if(vm.items) {
                var temp = vm.items.slice(vm.page, vm.page + 25);
                vm.page += 25;
                vm.viewItems = vm.viewItems.concat(temp);
            }
        }

        function getDetails(item) {
            ItemService
                .searchItemByEbayId(vm.uid, item.itemId[0])
                .success(function (itemObj) {
                    var newItem = filterItem(item, itemObj);
                    ItemService
                        .addItem(vm.uid, newItem)
                        .success(function (status) {
                            $location.url("/user/"+ vm.uid +"/details/" + item.itemId[0] + "/" + vm.title);
                        })
                        .error(function () {
                        });
                })
                .error(function () {
                });
        }

        function filterItem(item, item2) {
            var sellerlocation = "Exact Location not available";
            var desc = "Description not available";

            if(item2.Item.Location)
                sellerlocation = item2.Item.Location;

            if(item.subtitle)
                desc = item.subtitle[0];

            var newItem = {
                ebayId: item.itemId[0],
                name: item.title[0],
                category: (item.primaryCategory) ? item.primaryCategory[0].categoryName[0] : "No Category",
                condition: (item.condition) ? item.condition[0].conditionDisplayName[0] : "",
                description: desc,
                country: item.country[0],
                galleryURL: item.galleryURL[0],
                pictureURL: item2.Item.PictureURL[0],
                price: item.sellingStatus[0].currentPrice[0].__value__,
                sellerLocation: sellerlocation,
                url: item.viewItemURL[0]
            };
            return newItem;
        }
    }
})();