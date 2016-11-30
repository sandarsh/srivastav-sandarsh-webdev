module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        name: String,
        pageId : {type : mongoose.Schema.Types.ObjectId , ref : 'PageModel'},
        widgetType : {type: String , enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable : Boolean,
        formatted : Boolean
    }, {collection : "widget"});
    return WidgetSchema;
};