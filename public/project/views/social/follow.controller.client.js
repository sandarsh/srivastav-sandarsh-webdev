(function () {
    angular
        .module("eMarketApp")
        .controller("FollowController", FollowController);

    function FollowController(SocialService, $location, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.addUsersToList = addUsersToList;
        vm.getDetails = getDetails;
        var followStatus = ($routeParams.type == "1");

        function init() {
            if(followStatus) {
                vm.follow = "Following";
                SocialService
                    .getFollowing(vm.uid)
                    .success(function (result) {
                        vm.users = result;
                        vm.page = 0;
                        vm.viewUsers = [];
                        addUsersToList();
                    })
                    .error(function() {
                    });
            }
            else {
                vm.follow = "Followers";
                SocialService
                    .getFollowers(vm.uid)
                    .success(function (result) {
                        vm.users = result;
                        vm.page = 0;
                        vm.viewUsers = [];
                        addUsersToList();
                    })
                    .error(function() {
                    });
            }
        }
        init();

        function addUsersToList() {
            if(vm.users) {
                var temp = vm.users.slice(vm.page, vm.page + 25);
                vm.page += 25;
                vm.viewUsers = vm.viewUsers.concat(temp);
            }
        }

        function getDetails(user) {
            $location.url("/user/" + vm.uid + "/social/follow/"+ $routeParams.type +"/user/" + user._id);
        }
    }
})();