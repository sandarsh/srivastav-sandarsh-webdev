/**
 * Created by sandarshsrivastav on 16/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController)

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        //console.log(vm.widgets);
        vm.checkSafeHtml = checkSafeHtml;
        vm.transform = transform;


        function checkSafeHtml(html){
            //var html = enableCog(html);
            return $sce.trustAsHtml(html);
        }

        function transform(url){
            var urlSplit = url.split("/");
            var id = urlSplit[urlSplit.length - 1];
            var prefix = "https://www.youtube.com/embed/" + id;
            // console.log(prefix);
            return $sce.trustAsResourceUrl(prefix);

        }
    }



    function NewWidgetController($routeParams, WidgetService){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        var widgetType = $routeParams.type;
        vm.page = "views/widget/widget-" + widgetType + ".view.client.html";
        //var type = $routeParams.type;
        vm.addWidget = addWidget;

        function addWidget(name,text,size,url,width){
            var id = ((new Date().getTime() % 1000).toString());
            switch(widgetType){
                case "header":
                    var widget = {"_id" : id, "size":size, "text":text,"widgetType": "HEADER", "name":name};
                    WidgetService.createWidget(vm.pid,widget);
                    break;
                case "youtube":
                    //console.log("switch ran");
                    var widget = {"_id" : id, "width":width, "text":text,"widgetType": "YOUTUBE", "name":name, "url":url};
                    WidgetService.createWidget(vm.pid,widget);
                    break;
                case "html":
                    var widget = {"_id" : id, "size":size, "text":text,"widgetType": "HTML", "name":name};
                    WidgetService.createWidget(vm.pid,widget);
                    break;
                case "image":
                    var widget = {"_id" : id, "width":width, "text":text,"widgetType": "IMAGE", "name":name, "url":url};
                    WidgetService.createWidget(vm.pid,widget);
                    break;

            }

        }
    }






    function EditWidgetController($routeParams, WidgetService){
        var vm = this;
        var widget = WidgetService.findWidgetById($routeParams.wgid);
        var widgetType = widget.widgetType;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.name = widget.name;
        vm.text = widget.text;
        vm.size = widget.size;
        vm.url = widget.url;
        vm.width = widget.width;
        var wgid = $routeParams.wgid;
        vm.page = "views/widget/widget-" + widgetType.toLowerCase() + ".view.client.html";
        //console.log(wgid);

        function updateWidget(name, text, size, url ,width){
            //console.log(widgetType.toLowerCase());
            switch(widgetType.toLowerCase()){
                case "header":
                    var widget = {"pageId" : vm.pid, "size":size, "text":text,"widgetType": widgetType, "name":name};
                    WidgetService.updateWidget(wgid,widget);
                    break;
                case "youtube":
                    //console.log("switch ran");
                    var widget = {"pageId" : vm.pid, "width":width, "text":text,"widgetType": widgetType, "name":name, "url":url};
                    WidgetService.updateWidget(wgid,widget);
                    break;
                case "html":
                    var widget = {"pageId" : vm.pid, "size":size, "text":text,"widgetType": widgetType, "name":name};
                    WidgetService.updateWidget(wgid,widget);
                    break;
                case "image":
                    var widget = {"pageId" : vm.pid, "width":width, "text":text,"widgetType": widgetType, "name":name, "url":url};
                    WidgetService.updateWidget(wgid,widget);
                    break;

            }
        }
        function deleteWidget(){
            WidgetService.deleteWidget(wgid);
        }
    }
})();
