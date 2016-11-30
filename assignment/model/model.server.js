/**
 * Created by sandarshsrivastav on 27/11/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/cs5610Assignment');
    // console.log("Database created");

    var userModel = require("./user/user.model.server")();
    var WebsiteModel = require("./website/website.model.server")();
    var PageModel = require("./page/page.model.server")();
    var WidgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel : userModel,
        WebsiteModel : WebsiteModel,
        PageModel : PageModel,
        WidgetModel : WidgetModel
    };

    WebsiteModel.setModel(model);
    userModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

    return model;

};