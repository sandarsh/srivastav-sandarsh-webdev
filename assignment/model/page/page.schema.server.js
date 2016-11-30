module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        name: String,
        _website : {type : mongoose.Schema.Types.ObjectId , ref : 'WebsiteModel'},
        description : String,
        title : String,
        widgets : [{type : mongoose.Schema.Types.ObjectId , ref : 'WidgetModel'}]
    }, {collection : "page"});
    return PageSchema;
};