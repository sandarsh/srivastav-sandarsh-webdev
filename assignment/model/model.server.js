/**
 * Created by sandarshsrivastav on 27/11/16.
 */
module.exports = function() {

    var mongoose = require('mongoose');

    /*
     * Mongoose by default sets the auto_reconnect option to true.
     * We recommend setting socket options at both the server and replica set level.
     * We recommend a 30 second connection timeout because it allows for
     * plenty of time in most operating environments.
     */
    var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

    var mongodbUri = 'mongodb://sandarsh:San3.6.90@ds133398.mlab.com:33398/webappmaker';

    mongoose.connect(mongodbUri, options);
    var conn = mongoose.connection;

    conn.on('error', console.error.bind(console, 'connection error:'));

    conn.once('open', function() {
        // Wait for the database connection to establish, then start the app.
    });

    //
    // var mongoose = require('mongoose');
    // mongoose.connect('mongodb://sandarsh:sandy@gmail@ds133398.mlab.com:33398/webappmaker');
    // // console.log("Database created");

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