module.exports = function(app, model) {
    app.get("/api/user/:uid/social", searchUserByTitle);
    app.put('/api/user/:uid1/social/:uid2', followUser);
    app.get("/api/user/:uid/social/followers", getFollowers);
    app.get("/api/user/:uid/social/following", getFollowing);

    function searchUserByTitle(req, res) {
        var title = req.query.title;

        model
            .userModel
            .findUsersByTitle(title)
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

    function followUser(req, res) {
        var uid1 = req.params.uid1;
        var uid2 = req.params.uid2;

        model
            .userModel
            .followUser(uid1, uid2)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                });
    }

    function getFollowers(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .getFollowers(uid)
            .then(
                function (user) {
                    if(user)
                        res.json(user.followers);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getFollowing(req, res) {
        var uid = req.params.uid;

        model
            .userModel
            .getFollowing(uid)
            .then(
                function (user) {
                    if(user)
                        res.json(user.following);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};