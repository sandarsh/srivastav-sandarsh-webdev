module.exports = function(app, model) {
    app.get("/api/admin/user", fetchAllUsers);
    app.get("/api/admin/item", fetchAllItems);
    app.put('/api/admin/user/:uid', updateUser);
    app.delete('/api/admin/user/:uid', unregisterUser);

    // app.get("/api/user/:uid/social", searchUserByTitle);
    // app.put('/api/user/:uid1/social/:uid2', followUser);

    function fetchAllUsers(req, res) {
        model
            .userModel
            .findAllUsers()
            .then(
                function (users) {
                    if(users)
                        res.json(users);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function fetchAllItems(req, res) {
        model
            .itemModel
            .findAllItems()
            .then(
                function (items) {
                    if(items)
                        res.json(items);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                });
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    // function searchUserByTitle(req, res) {
    //     var title = req.query.title;
    //
    //     model
    //         .userModel
    //         .findUsersByTitle(title)
    //         .then(
    //             function (users) {
    //                 if(users)
    //                     res.json(users);
    //                 else
    //                     res.send("0");
    //             },
    //             function (error) {
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    // }

    // function followUser(req, res) {
    //     var uid1 = req.params.uid1;
    //     var uid2 = req.params.uid2;
    //
    //     model
    //         .userModel
    //         .followUser(uid1, uid2)
    //         .then(
    //             function (status) {
    //                 res.sendStatus(200);
    //             },
    //             function () {
    //                 res.sendStatus(400);
    //             }
    //         );
    // }
};