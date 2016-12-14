(function () {
    angular
        .module("eMarketApp")
        .controller("SingleDetailsController", SingleDetailsController);

    function SingleDetailsController(ItemService, $routeParams, $timeout) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.itemId = $routeParams.itemId;
        vm.addToCart = addToCart;
        vm.itemStatus = false;
        vm.type = $routeParams.type;


        function initMap() {
            var uluru = {lat: 38.7783, lng: -119.4179};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru,
                scrollwheel: false
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
        initMap();

        function init() {
            vm.itemStatus = false;
            ItemService
                .findById(vm.uid, vm.itemId)
                .success(function(item) {
                    vm.cartStatus = "Added to Cart";
                    vm.item = item;
                    // ItemService
                    //     .checkCartStatus(vm.uid, vm.itemId)
                    //     .success(function (userObj) {
                    //         var cartItems = userObj.cartItems;
                    //         for(var i in cartItems) {
                    //             if(cartItems['i']._id == vm.itemId)
                    //                 vm.cartStatus = "ADDED TO CART!"
                    //         }
                    //     });
                })
                .error(function() {
                })
        }
        init();

        function addToCart() {
            ItemService
                .addToCart(vm.uid, vm.itemId, vm.item)
                .success(function(status) {
                   vm.cartStatus = "Add To Cart!"
                })
                .error(function() {
                });
        }
    }
})();