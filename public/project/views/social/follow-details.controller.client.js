(function () {
    angular
        .module("eMarketApp")
        .controller("FollowDetailsController", FollowDetailsController);

    function FollowDetailsController(SocialService, $routeParams, $timeout) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.uid2 = $routeParams.uid2;
        vm.followUser = followUser;
        vm.followStatus = false;
        vm.type = $routeParams.type;

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