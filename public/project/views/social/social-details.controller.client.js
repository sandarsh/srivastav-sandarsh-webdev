(function () {
    angular
        .module("eMarketApp")
        .controller("SocialDetailsController", SocialDetailsController);

    function SocialDetailsController(SocialService, $routeParams, $timeout) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.uid2 = $routeParams.uid2;
        vm.followUser = followUser;
        vm.followStatus = false;
        vm.depth = $routeParams.uid;

        function init() {
            vm.followStatus = false;
            SocialService
                .findUserById(vm.uid2)
                .success(function(user) {
                    vm.user = user;
                    vm.isFollowing = "Follow " + user.first;
                })
                .error(function() {
                });
        }
        init();

        function followUser() {
            SocialService
                .followUser(vm.uid, vm.uid2)
                .success(function(status) {
                        vm.isFollowing = "Following!";
                })
                .error(function() {
                });
        }
    }
})();