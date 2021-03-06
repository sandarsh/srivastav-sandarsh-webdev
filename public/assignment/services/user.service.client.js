(function() {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);
    function UserService($http){

        var api = {
            checkLogin : checkLogin,
            login : login,
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            logout: logout,
            findCurrentUser: findCurrentUser
        };
        return api;


        function findCurrentUser() {
            return $http.get("/api/user");

        }



        function logout(){
            return $http.post("/api/logout");
        }


        function checkLogin(){
            return $http.post("/api/checkLogin");
        }


        function login(username, password){

            var user = {
                username : username,
                password : password
            };
            console.log(user);
            var url = '/api/login';
            return $http.post(url, user);
        }


        function createUser(user){
            // var id = ((new Date().getTime() % 1000).toString());
            // user._id = id;
            var url = '/api/user';
            return $http.post(url, user);
        }

        function findUserById(id){
            var url = '/api/user/' + id;
            return $http.get(url);
        }

        function findUserByUsername(uname){
            var url = '/api/user?username='+uname;
            return $http.get(url);
        }

        function findUserByCredentials(uname,pwd){
            var url = '/api/user?username=' + uname + '&password=' + pwd;
            return $http.get(url);

        }

        function updateUser(newuser){
            var url = "/api/user/" + newuser._id;
            return $http.put(url, newuser);
        }

        function deleteUser(userId){
            var url = "/api/user/" + userId;
            //console.log(url);
            return $http.delete(url);
        }
    }
})();
