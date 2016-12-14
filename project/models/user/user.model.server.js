module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel: setModel,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByGoogleId: findUserByGoogleId,
        findUsersByTitle: findUsersByTitle,
        getFollowers: getFollowers,
        getFollowing: getFollowing,
        followUser: followUser,
        removeUser: removeUser,
        updateUser: updateUser,
        uploadDisplayPicture: uploadDisplayPicture,
        getCartItems: getCartItems,
        getHistoryItems: getHistoryItems
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }
    
    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({
                "google.id": googleId
            });
    }

    function findUserByUsername(username) {
        return UserModel
            .findOne({
                username: username
            });
    }

    function findUserByCredentials(username, password) {
        return UserModel
            .findOne({
                username: username,
                password: password
            });
    }

    function findUserById(userId) {
        //return UserModel.find({_id: userId}); -> returns an array
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    dpURL: user.dpURL
                }
            );
    }

    function removeUser(userId) {
        return UserModel
            .remove({
                _id: userId
            });
    }

    function findUsersByTitle(title) {
        var keyword = new RegExp(title);
        //
        var query = {$or: [{first: keyword}, {last: keyword}, {username: keyword}, {email: keyword}]};
        return UserModel.find(query);
    }

    function followUser(uid1, uid2) {
        return UserModel
            .findById(uid1)
            .then(
                function (userObj1) {
                    UserModel
                        .findById(uid2)
                        .then(
                            function (userObj2) {
                                userObj1.following.push(userObj2);
                                userObj2.followers.push(userObj1);
                                userObj1.save();
                                userObj2.save();
                                return userObj1;
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findAllUsers() {
        return UserModel
            .find({
                role: "USER"
            });
    }

    function getFollowers(uid) {
        return UserModel
            .findById(uid)
            .populate("followers")
            .exec();
    }

    function getFollowing(uid) {
        return UserModel
            .findById(uid)
            .populate("following")
            .exec();
    }

    function getCartItems(uid) {
        return UserModel
            .findById(uid)
            .populate("itemCart")
            .exec();
    }

    function getHistoryItems(uid) {
        return UserModel
            .findById(uid)
            .populate("itemHistory")
            .exec();
    }

    function uploadDisplayPicture(uid, localURL) {
        return UserModel
            .update({
                _id: uid
            },
            {
                dpURL: localURL
            });
    }
};