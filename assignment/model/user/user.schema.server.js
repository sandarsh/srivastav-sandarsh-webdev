module.exports = function () {
    var mongoose = require('mongoose');
    //var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema =  mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        phone : Number,
        google: {
            token: String,
            id: String
        },
        facebook: {
            token: String,
            id: String
        },
        websites : [{type : mongoose.Schema.Types.ObjectId , ref : 'WebsiteModel'}],
        dateCreated : Date
    },{collection : "user"});
    return UserSchema;
};
