module.exports = function(app){
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" , "description": "This is a test description" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" ,"description": "This is a test description" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "This is a test description" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "This is a test description" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "This is a test description" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "This is a test description" }
    ];

    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.post('/api/user/:uid/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res){
        var website = req.body;
        websites.push(website);
        res.send(website);
        return;
    }

    function deleteWebsite(req, res){
        var wid = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id === wid){
                var del = websites[w];
                websites.splice(w,1);
                res.send(del);
                return;
            }
        }
        res.send("0");
        return;
    }

    function updateWebsite(req, res){
        var website = req.body;
        var id = req.params.websiteId;
        //console.log(website);
        for (var w in websites){
            if(id === websites[w]._id){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.send(websites[w]);
                return;
            }
        }
        res.send("0");
        return;
    }


    function findWebsiteById(req,res){
        var wid = req.params.websiteId;
        var w;
        for(w in websites){
            if(websites[w]._id === wid){
                res.send(websites[w]);
                //console.log("I ran too!!")
                return;
            }
        }
        res.send("0");
        return;
    }

    function findAllWebsitesForUser(req, res){
        var devId = req.params.uid;
        var result = [];
        for(var w in websites){
            if(websites[w].developerId === devId){
                result.push(websites[w]);
            }
        }
        res.send(result);
        //console.log("server code ran");
        return;
    }


}