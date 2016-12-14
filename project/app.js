module.exports = function(app) {
    var model = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, model);
    require("./services/item.service.server.js")(app, model);
    require("./services/social.service.server.js")(app, model);
    require("./services/admin.service.server.js")(app, model);
};