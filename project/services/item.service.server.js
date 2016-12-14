module.exports = function(app, model) {
    var http = require('http');
    var myAppId = "ShreyesK-WebDevPr-PRD-c45f0c763-22c8514c";
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/project/upload'});
    var fs = require('fs');

    app.get("/api/user/:uid/item/:itemId", findById);
    app.get("/api/user/:uid/item-ebay/:itemId", findItemByEbayId);
    app.get("/api/user/:uid/item/", searchAllItemsForSale);
    app.post("/api/user/:uid/item/search/:title", searchItemByKeyword);
    app.post("/api/user/:uid/item/getSingle/:itemId", searchItemByEbayId);
    app.post("/api/user/:uid/item", addItem);
    app.post("/api/user/:uid/new-item", createItem);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/user/:uid/item/:itemId/cart", addToCart);
    app.put("/api/user/:uid/item/:itemId", updateItem);
    app.delete("/api/user/:uid/item/:itemId", removeItem);

    function searchItemByKeyword(req, res) {
        var url = "http://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + myAppId;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&REST-PAYLOAD";
        url += "&keywords="+req.params.title;
        url += "&paginationInput.entriesPerPage=100";

        callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };

        http.request(url, callback).end();
    }

    function searchItemByEbayId(req, res) {
        var itemId = req.params.itemId;
        var url = "http://open.api.ebay.com/shopping";
        url += "?callname=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + myAppId;
        url += "&siteid=0";
        url += "&version=967";
        url += "&ItemID=" + itemId;

        callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };

        http.request(url, callback).end();
    }

    function addItem(req, res) {
        var uid = req.params.uid;
        var item = req.body;

        model
            .itemModel
            .addItem(uid, item)
            .then(
                function(item) {
                    res.send(item);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findItemByEbayId(req, res) {
        var itemId = req.params.itemId;

        model
            .itemModel
            .findItemByEbayId(itemId)
            .then(
                function (itemObj) {
                    if(itemObj)
                        res.json(itemObj);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function addToCart(req, res) {
        var uid = req.params.uid;
        var item = req.body;

        model
            .itemModel
            .addToCart(uid, item)
            .then(
                function(userObj) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function searchAllItemsForSale(req, res) {
        var uid = req.params.uid;

        model
            .itemModel
            .searchAllItemsForSale(uid)
            .then(
                function (user) {
                    if(user)
                        res.json(user.itemForSale);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createItem(req, res) {
        var uid = req.params.uid;
        var item = req.body;

        model
            .itemModel
            .createItem(uid, item)
            .then(
                function(item) {
                    res.send(item);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findById(req, res) {
        var itemId = req.params.itemId;

        model
            .itemModel
            .findById(itemId)
            .then(
                function (itemObj) {
                    if(itemObj)
                        res.json(itemObj);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateItem(req, res) {
        var item = req.body;
        var uid = req.params.uid;
        var itemId = req.params.itemId;

        model
            .itemModel
            .updateItem(item, itemId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function removeItem(req, res) {
        var uid = req.params.uid;
        var itemId = req.params.itemId;

        model
            .itemModel
            .removeItem(uid, itemId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var uid           = req.body.uid;
        var itemId           = req.body.itemId;

        var localUrl = '/project/upload/' + filename;

        model
            .itemModel
            .uploadImage(itemId, localUrl)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        var url = '/project/index.html#/user/'+uid+'/sell/'+itemId;
        res.redirect(url);
    }
};