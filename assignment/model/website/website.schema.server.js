module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = mongoose.Schema({
        name: String,
        _user : {type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'},
        description : String,
        pages : [{type : mongoose.Schema.Types.ObjectId , ref : 'PageModel'}]
    }, {collection : "website"});
    return WebsiteSchema;
};