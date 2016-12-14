module.exports = function() {
    var connectionString = 'mongodb://127.0.0.1:27017/WebAppMaker';

    var mongoose = require("mongoose");     //npm install mongoose --save
    mongoose.connect(connectionString);     //connecting to a database

    var userModel = require("./user/user.model.server")();
    var itemModel = require("./item/item.model.server")();

    var model = {
        userModel: userModel,
        itemModel: itemModel
    };

    userModel.setModel(model);
    itemModel.setModel(model);

    return model;
};