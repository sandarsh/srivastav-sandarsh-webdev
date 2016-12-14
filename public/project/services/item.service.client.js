(function () {
    angular
        .module("eMarketApp")
        .factory("ItemService", ItemService);

    function ItemService($http) {
        var api = {
            searchItemByTitle: searchItemByTitle,
            addItem: addItem,
            findItemByEbayId: findItemByEbayId,
            searchItemByEbayId: searchItemByEbayId,
            addToCart: addToCart,
            searchAllItemsForSale: searchAllItemsForSale,
            createItem: createItem,
            findById: findById,
            updateItem: updateItem,
            removeItem: removeItem
        };
        return api;

        function searchItemByTitle(uid, title) {
            var url = "/api/user/" + uid + "/item/search/" + title;
            return $http.post(url);
        }

        function searchItemByEbayId(uid, itemId) {
            var url = "/api/user/" + uid + "/item/getSingle/" + itemId;
            return $http.post(url);
        }

        function addItem(uid, item) {
            var url = "/api/user/" + uid + "/item";
            return $http.post(url, item);
        }

        function findItemByEbayId(uid, itemId) {
            var url = "/api/user/" + uid + "/item-ebay/" + itemId;
            return $http.get(url);
        }

        function addToCart(uid, itemId, item) {
            var url = "/api/user/" + uid + "/item/" + itemId + "/cart";
            return $http.put(url, item);
        }

        function searchAllItemsForSale(uid) {
            var url = "/api/user/" + uid + "/item/";
            return $http.get(url);
        }

        function createItem(uid, item) {
            var url = "/api/user/" + uid + "/new-item/";
            return $http.post(url, item);
        }

        function findById(uid, itemId) {
            var url = "/api/user/" + uid + "/item/" + itemId;
            return $http.get(url);
        }

        function updateItem(item, uid, itemId) {
            var url = "/api/user/" + uid + "/item/" + itemId;
            return $http.put(url, item);
        }

        function removeItem(uid, itemId) {
            var url = "/api/user/" + uid + "/item/" + itemId;
            return $http.delete(url);
        }
    }
})();