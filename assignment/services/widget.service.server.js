module.exports = function(app, model){
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/8-cell.gif"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/eN24Sv0qS1w" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var fs = require('fs');
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/page/:pageId/widget', sort);


    function sort(req, res){
        var query = req.query;
        var initial = query.initial;
        var final = query.final;
        widgets.splice(final, 0, widgets.splice(initial,1)[0]);
        //console.log(widgets);
        res.sendStatus(200);
    }


    function uploadImage(req, res) {


        var name = req.body.name;
        var text = req.body.text;
        var pid = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var resurl = req.body.resulturl;
        //console.log(name, text, pid, widgetId, width);


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var extension = "." + mimetype.split("/")[1];
        var url = "/uploads/" + filename + extension;
        fs.rename(path, path+ extension, function(err){
            if (err) throw err;
            //console.log("rename completed");
        });
        var upload = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pid, "width": width,
            "url": url, "name": name, "text": text, "uploaded": true};

        // for(var w in widgets){
        //     if(widgets[w]._id === widgetId){
        //         if(widgets[w].uploaded === true) {
        //             fs.unlink(__dirname + '/../../public/' + widgets[w].url, function (err) {
        //                 if (err) throw err;
        //                 //console.log('successfully deleted ' + widgets[w].url);
        //             });
        //         }
        //         widgets.splice(w,1,upload);
        //         res.status(200);
        //         res.redirect("/assignment"+resurl);
        //         return;
        //     }
        // }
        widgets.push(upload);
        //console.log(resurl);
        res.status(200);
        res.redirect("/assignment"+resurl);
        return;
    }


    function createWidget(req, res){
        var pid = req.params.pageId;
        var widget  = req.body;
        model
            .WidgetModel
            .createWidget(pid, widget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }


    function deleteWidget(req,res){
        var wid = req.params.widgetId;
        model
            .WidgetModel
            .deleteWidget(wid)
            .then(
                function(status)
                {
                    res.sendStatus(status);
                },
                function(error)
                {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model
            .WidgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findWidgetById(req,res){
        var wid = req.params.widgetId;
        model
            .WidgetModel
            .findWidgetById(wid)
            .then(
                function(widget){
                    res.send(widget);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }


    function findAllWidgetsForPage(req,res){
        var pid = req.params.pageId;
        model
            .WidgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function(page)
                {
                    res.json(page.widgets);
                },
                function(error)
                {
                    res.sendStatus(400).send(error);
                });
    }
};