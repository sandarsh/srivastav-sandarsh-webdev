module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
        createWebsite : createWebsite,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        findAllPagesForWebsite : findAllPagesForWebsite,
        setModel : setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function findAllPagesForWebsite(wid){
        return WebsiteModel.findById(wid).populate("pages", "name").exec();
    }

    function deleteWebsite(wid) {
                return WebsiteModel
                    .remove({_id : wid});
    }

    function updateWebsite(wid, website){
        return WebsiteModel
            .update({_id : wid},
                {name : website.name,
                description: website.description});
    }

    function findWebsiteById(wid){
        return WebsiteModel.findById(wid);
    }


    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function createWebsite(uid, website){
        website._user = uid;
        return WebsiteModel
            .create(website)
            .then(function(website){
                model.userModel.findUserById(uid)
                    .then(function(usrObj){
                        usrObj.websites.push(website);
                        return usrObj.save();
                    })
            });
    }
};