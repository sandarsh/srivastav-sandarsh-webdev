module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({      //instances of the records
        username: {type: String, required: true},
        password: {type: String, required: true},
        first: {type: String, required: true},
        last: String,
        email: String,
        phone: String,
        google: {
            id: String,
            token: String
        },
        facebook: {
            id: String,
            token: String
        },
        dpURL: {type: String, default: 'upload/icon_blue.svg'},
        address: String,
        role: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
        itemHistory: [{type: mongoose.Schema.Types.ObjectId, ref:'ItemModel'}],
        itemCart: [{type: mongoose.Schema.Types.ObjectId, ref:'ItemModel'}],
        itemForSale: [{type: mongoose.Schema.Types.ObjectId, ref:'ItemModel'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        posted: {type: Date, default: Date.now}
    }, {collection: 'prj_user'});

    return UserSchema;
};