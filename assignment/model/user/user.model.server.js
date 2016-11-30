module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllWebsitesForUser : findAllWebsitesForUser,
        updateUser : updateUser,
        deleteUser : deleteUser,
        setModel : setModel
    };
    return api;


    function setModel(_model){
        model = _model;
    }

    function findAllWebsitesForUser(uid){
        return UserModel
            .findById(uid)
            .populate("websites", "name")
            .exec();
    }


    function deleteUser(userId){
        return UserModel.remove({_id : userId});
    }

    function findUserByCredentials(username, password){
        return UserModel.findOne({
            username : username,
            password : password
        });
    }

    function findUserByUsername(username){
        return UserModel
            .findOne({username : username});
    }

    function updateUser(id, user){
        return UserModel
            .update(
                {_id : id},
                { firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email}
            )
    }

    function createUser(user){
        return UserModel.create(user);
    }

    function findUserById(id){
        return UserModel.findById(id);
    }


};