module.exports = function() {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        setModel : setModel,
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        findAllWidgetsForPage : findAllWidgetsForPage
    };

    return api;

    function findAllWidgetsForPage(pid){
        return PageModel.findById(pid).populate("widgets").exec();
    }

    function deletePage(pid){
        return PageModel
            .remove({_id:pid});
    }

    function updatePage(pid, page){
        return PageModel
            .update({_id : pid},
                {
                    name : page.name,
                    title: page.title
                });
    }

    function findPageById (pid){
        return PageModel.findById(pid);
    }

    function findAllPagesForWebsite(wid){
        return model.WebsiteModel.findAllPagesForWebsite(wid);
    }

    function createPage(websiteId, page){
        page._website = websiteId;
        return PageModel
            .create(page)
            .then(function(page){
                model.WebsiteModel.findWebsiteById(websiteId)
                    .then(function(websiteObj){
                        websiteObj.pages.push(page);
                        return websiteObj.save();
                    })
            });
    }


    function setModel(_model){
        model = _model;
    }
};