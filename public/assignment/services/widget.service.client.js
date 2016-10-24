/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)

    function WidgetService(){
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

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget){
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId){
            var widget;
            var res = [];
            for(widget in widgets){
                if(widgets[widget].pageId === pageId){
                    res.push(widgets[widget]);
                }
            }
            return res;
        }

        function findWidgetById(widgetId){
            var widget;
            for(widget in widgets){
                if(widgets[widget]._id === widgetId){
                    return widgets[widget];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            var wdgt;
            var ind;
            for(wdgt in widgets){
                if(widgets[wdgt]._id === widgetId){
                    ind = wdgt;
                    break;
                }
            }
            var found = widgets[ind];
            switch(found.widgetType.toLowerCase()){
                case "header":
                    found.size = widget.size;
                    found.text = widget.text;
                    found.name = widget.name;
                    break;
                case "youtube":
                    found.width = widget.width;
                    found.text = widget.text;
                    found.name = widget.name;
                    found.url = widget.url;
                    break;
                case "html":
                    found.size = widget.size;
                    found.text = widget.text;
                    found.name = widget.name;
                    break;
                case "image":
                    found.width = widget.width;
                    found.text = widget.text;
                    found.name = widget.name;
                    found.url = widget.url;
                    break;
            }
            //console.log(widgets);
        }

        function deleteWidget(widgetId){
            var widget;
            var ind;
            for(widget in widgets){
                if(widgets[widget]._id === widgetId){
                    ind = widget;
                    break;
                }
            }
            widgets.splice(ind,1);
        }
    }
})();