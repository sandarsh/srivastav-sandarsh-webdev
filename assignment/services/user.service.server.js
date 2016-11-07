module.exports = function(app){
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req,res){
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id === userId){
                users.splice(u,1);
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function updateUser(req, res){
        //console.log("updated");
        var user = req.body;
        var id = user._id;
        var username = user.username;
        var password = user.password;
        var email = user.email;
        var firstname = user.firstName;
        var lastname = user.lastName;
        for(var u in users){
            if(users[u]._id === id){
                var curr = users[u];
                curr.username = username;
                curr.password = password;
                curr.email = email;
                curr.firstName = firstname;
                curr.lastName = lastname;
                res.send(users[u]._id);
                return;
            }
        }
        res.send("0");
        return;
    }

    function createUser(req, res){
        var user = req.body;
        users.push(user);
        res.send(user);
        return;
    }

    function findUser(req, res) {
        var query = req.query;
        //console.log(query);
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            //console.log("this ran")
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username === username && users[u].password === password){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function findUserById(req, res){
        var id = req.params.uid;
        for(var u in users){
            if(users[u]._id === id){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

};
















