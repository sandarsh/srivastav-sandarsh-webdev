(function() {
    angular
        .module("eMarketApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/guest/search', {
                templateUrl: 'views/guest/guest.view.client.html',
                controller: 'GuestController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/user', { /* profile */
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid', { /* profile */
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/search', {
                templateUrl: 'views/search/search.view.client.html',
                controller: 'ItemSearchController',
                controllerAs: 'model'
            })
            .when('/user/:uid/search/:title', {
                templateUrl: 'views/search/search.view.client.html',
                controller: 'ItemSearchController',
                controllerAs: 'model'
            })
            .when('/user/:uid/details/:itemId/:title', {
                templateUrl: 'views/details/details.view.client.html',
                controller: 'ItemDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:uid/details/item/list/:type', {
                templateUrl: 'views/details/personal-items.view.client.html',
                controller: 'PersonalItemsController',
                controllerAs: 'model'
            })
            .when('/user/:uid/details/item/list/:type/:itemId', {
                templateUrl: 'views/details/single-details.view.client.html',
                controller: 'SingleDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:uid/sell', {
                templateUrl: 'views/sell/sell-list.view.client.html',
                controller: 'ItemSaleController',
                controllerAs: 'model'
            })
            .when('/user/:uid/sell/new', {
                templateUrl: 'views/sell/sell-new.view.client.html',
                controller: 'NewItemController',
                controllerAs: 'model'
            })
            .when('/user/:uid/sell/:itemId', {
                templateUrl: 'views/sell/sell-edit.view.client.html',
                controller: 'EditItemController',
                controllerAs: 'model'
            })
            .when('/user/:uid/social', {
                templateUrl: 'views/social/social-list.view.client.html',
                controller: 'SocialListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/social/follow/:type', {
                templateUrl: 'views/social/follow.view.client.html',
                controller: 'FollowController',
                controllerAs: 'model'
            })
            .when('/user/:uid/social/follow/:type', {
                templateUrl: 'views/social/follow.view.client.html',
                controller: 'FollowController',
                controllerAs: 'model'
            })
            .when('/user/:uid/social/follow/:type/user/:uid2', {
                templateUrl: 'views/social/follow-details.view.client.html',
                controller: 'FollowDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:uid/social/:uid2', {
                templateUrl: 'views/social/social-details.view.client.html',
                controller: 'SocialDetailsController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin-home.view.client.html',
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/user-list.view.client.html',
                controller: 'AdminUserController',
                controllerAs: 'model',
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when('/admin/user/:uid', {
                templateUrl: 'views/admin/user-edit.view.client.html',
                controller: 'AdminUserDetailsController',
                controllerAs: 'model',
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when('/admin/item', {
                templateUrl: 'views/admin/item-list.view.client.html',
                controller: 'AdminItemController',
                controllerAs: 'model',
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when('/admin/item/:itemId', {
                templateUrl: 'views/admin/item-edit.view.client.html',
                controller: 'AdminDetailsController',
                controllerAs: 'model',
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: '/login'
            });

        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer(); //$q allows to synchronize things which otherwise be asynchronus
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject('0');
                            $location.url('/login');
                        }
                    }
                );

            return deferred.promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer(); //$q allows to synchronize things which otherwise be asynchronus
            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject('0');
                            $location.url('/login');
                        }
                    }
                );

            return deferred.promise;
        }
    }
})();
