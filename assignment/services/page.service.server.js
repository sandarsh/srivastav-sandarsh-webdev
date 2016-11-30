module.exports = function(app, model){

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId' , deletePage);
    app.post('/api/website/:websiteId/page', createPage);


    function createPage(req, res){
        var page = req.body;
        model
            .PageModel
            .createPage(req.params.websiteId, page)
            .then(function (page) {
                res.json(page);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }

    function deletePage(req, res){
        var pid = req.params.pageId;
        model
            .PageModel
            .deletePage(pid)
            .then(
                function(status){
                    res.sendStatus(status);
                },
                function(error){
                    res.sendStatus(400).send(error);

                }
            )
    }

    function updatePage(req, res){
        var pid = req.params.pageId;
        var newPage = req.body;
        model
            .PageModel
            .updatePage(pid, newPage)
            .then(
                function(status){
                    res.sendStatus(status);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }


    function findPageById(req,res){
        var id = req.params.pageId;
        model
            .PageModel
            .findPageById(id)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllPagesForWebsite(req, res){
        var wid = req.params.websiteId;
        model
            .PageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (website) {
                    res.json(website.pages);
                },
                function (error) {
                    res.sendStatus(400).send("error");
                });
    }


};