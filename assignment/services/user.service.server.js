module.exports = function(app, model){


    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req,res){
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(status);
                },
                function(error){
                    res.send(error);
                });
    }

    function updateUser(req, res){
        // console.log("updated");
        var user = req.body;
        var id = req.params.uid;
        // console.log(user , id);
        model
            .userModel
            .updateUser(id, user)
            .then(
                function (status) {
                    res.sendStatus(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createUser(req, res){
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser){
                    // console.log(newUser);
                    res.send(newUser);
                },
                function(error){
                  res.sendStatus(400).send(error);

                }
            );
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
        model
            .userModel
            .findUserByUsername(username)
            .then(function (newUser) {
                if(newUser){
                    res.json(newUser);
                } else{
                    res.send("0");
                }

            },
            function (error) {
                res.sendStatus(400).send(error);
            })
    }



    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.send(user);
                } else{
                    res.send("0");
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findUserById(req, res){
        var id = req.params.uid;
        model
            .userModel
            .findUserById(id)
            .then(
                function(user){
                    if(user){
                        res.send(user);
                    } else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).res.send(error);
                }
            );
        // res.send("0");
    }

};
















