/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);
    function UserService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(user){
            users.push(user);
            //console.log(users);
        }

        function findUserById(id){
            var user;
            for(user in users){
                if(users[user]._id === id){
                    return users[user];
                }
            }
            return null;
        }

        function findUserByUsername(uname){
            var user;
            for(user in users){
                if(users[user].username === uname){
                    return users[user];
                }
            }
        return null;
        }

        function findUserByCredentials(uname,pwd){
            var user;
            for(user in users){
                if(users[user].username === uname && users[user].password === pwd){
                    return users[user];
                }
            }
            return null;
        }

        function updateUser(userId, newuser){
            var user;
            var ind;
            for(user in users){
                if(users[user]._id === userId) {
                    ind = user;
                    break;
                }
            }
            users.splice(ind,1);
            newuser._id = userId;
            users.push(newuser);
            //console.log(users);
        }

        function deleteUser(userId){
            var user;
            for(user in users){
                if(users[user]._id === userId) {
                    var ind = user;
                    break;
                }
            }
            user.splice(ind,1);
        }
    }
})();
