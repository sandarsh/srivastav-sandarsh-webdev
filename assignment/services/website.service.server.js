module.exports = function(app, model){

    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.post('/api/user/:uid/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res){
        var website = req.body;
        model
            .WebsiteModel
            .createWebsite(req.params.uid, website)
            .then(function (website) {
                res.json(website);
                
            }, function(error){
                res.sendStatus(400).send(error);
        });
    }

    function deleteWebsite(req, res){
        var wid = req.params.websiteId;
        model
            .WebsiteModel
            .deleteWebsite(wid)
            .then(function(status){
                res.sendStatus(status);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }

    function updateWebsite(req, res){
        var website = req.body;
        var wid = req.params.websiteId;
        model
            .WebsiteModel
            .updateWebsite(wid, website)
            .then(function(status){
                res.sendStatus(status);
            }, function(error){
                res.sendStatus(400).send(error);

            });
    }


    function findWebsiteById(req,res){
        var wid = req.params.websiteId;
        model
            .WebsiteModel
            .findWebsiteById(wid)
            .then(function (website) {
                 res.json(website);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var devId = req.params.uid;
        model
            .WebsiteModel
            .findAllWebsitesForUser(devId)
            .then(
                function (user) {
                    res.json(user.websites);
                },
                function (error) {
                    res.sendStatus(400).send("error");
                });
    }


};