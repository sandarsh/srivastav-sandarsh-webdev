module.exports = function(app){
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Test Title" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Test Title" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Test Title" }
    ];

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId' , deletePage);
    app.post('/api/website/:websiteId/page', createPage);


    function createPage(req, res){
        var wid = req.params.websiteId;
        var page = req.body;
        page.websiteId = wid;
        pages.push(page);
        res.send(page);
        return;
    }

    function deletePage(req, res){
        var pid = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === pid){
                var deleted = pages[p];
                //console.log("ran!!");
                pages.splice(p,1);
                res.send(deleted);
                return;
            }
        }
        res.send("0");
        return;
    }

    function updatePage(req, res){
        var pid = req.params.pageId;
        var newPage = req.body;
        for(var p in pages){
            if(pages[p]._id == pid){
                pages[p].name = newPage.name;
                pages[p].title = newPage.title;
                res.send(pages[p]);
                //console.log("returning!!")
                return;
            }
        }
        res.send("0");
        return;
    }


    function findPageById(req,res){
        var id = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === id){
                res.send(pages[p]);
                return;
            }
        }
        res.send("0");
        return;
    }

    function findAllPagesForWebsite(req, res){
        var wid = req.params.websiteId;
        var reslt = [];
        for(var p in pages){
            if(pages[p].websiteId === wid){
                reslt.push(pages[p]);
            }
        }
        res.send(reslt);
        return;
    }


};