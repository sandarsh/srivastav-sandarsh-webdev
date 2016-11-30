(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        vm.id = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        // var widgets = $(".wam-widgets").sortable({
        //     axis:'y'
        // });
        var findWidgetsPromise = WidgetService.findWidgetsByPageId(vm.pid);
        findWidgetsPromise
            .success(function(widgets){
                console.log(widgets);
                vm.widgets = widgets;
            })
            .error(function(){
                console.log("Server error in fetching widgets");
            });

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

        function addWidget(name,text,size,url,width, rows, placeholder, formatted){
            var widget = {};
            switch(widgetType){
                case "header":
                    widget = {"size":size, "text":text,"widgetType": "HEADER", "name":name};
                    break;
                case "youtube":
                    //console.log("switch ran");
                    widget = {"width":width, "text":text,"widgetType": "YOUTUBE", "name":name, "url":url};
                    break;
                case "html":
                    widget = {"size":size, "text":text,"widgetType": "HTML", "name":name};
                    break;
                case "image":
                    widget = {"width":width, "text":text,"widgetType": "IMAGE", "name":name, "url":url};
                    break;
                case "text":
                    widget = {"width":width, "text":text,"widgetType": "TEXT", "name":name, "url":url, "rows" : rows, "placeholder" : placeholder, "formatted" : formatted};
                    break;

            }
            var createWidgetPromise = WidgetService.createWidget(vm.pid,widget);
            createWidgetPromise
                .success(function(widget){
                    console.log(widget);
                })
                .error(function(){
                    console.log("Error in widget creation!");
            });
        }
    }







    function EditWidgetController($routeParams, WidgetService){
        var vm = this;
        var findWidgetPromise = WidgetService.findWidgetById($routeParams.wgid);
        vm.deleteWidget = deleteWidget;

        function deleteWidget(){
            var wgid = $routeParams.wgid;
            var deleteWidgetPromise = WidgetService.deleteWidget(wgid);
            deleteWidgetPromise
                .success(function(widget){
                    console.log(widget);
                })
                .error(function(){
                    console.log("Could not delete widget");
                });
        }

        findWidgetPromise
            .success(function(mywidget){
                var widget = mywidget;
                var widgetType = widget.widgetType;
                vm.updateWidget = updateWidget;
                vm.id = $routeParams.uid;
                vm.wid = $routeParams.wid;
                vm.pid = $routeParams.pid;
                vm.name = widget.name;
                vm.text = widget.text;
                vm.size = widget.size;
                vm.url = widget.url;
                vm.width = widget.width;
                vm.placeholder = widget.placeholder;
                vm.rows = widget.rows;
                vm.formatted = widget.formatted;
                var wgid = $routeParams.wgid;
                vm.page = "views/widget/widget-" + widgetType.toLowerCase() + ".view.client.html";

                function updateWidget(name, text, size, url ,width, rows, placeholder, formatted){
                    //console.log(widgetType.toLowerCase());
                    var widget = {}
                    switch(widgetType.toLowerCase()){
                        case "header":
                            widget = {"pageId" : vm.pid, "size":size, "text":text,"widgetType": widgetType, "name":name};
                            break;
                        case "youtube":
                            //console.log("switch ran");
                            widget = {"pageId" : vm.pid, "width":width, "text":text,"widgetType": widgetType, "name":name, "url":url};
                            break;
                        case "html":
                            widget = {"pageId" : vm.pid, "size":size, "text":text,"widgetType": widgetType, "name":name};
                            break;
                        case "image":
                            widget = {"pageId" : vm.pid, "width":width, "text":text,"widgetType": widgetType, "name":name, "url":url};
                            break;
                        case "text":
                            widget = {"pageId" : vm.pid, "width":width, "text":text,"widgetType": widgetType, "name":name, "url":url,"rows" : rows, "placeholder" : placeholder, "formatted" : formatted};
                            break;
                    }
                    var updateWidgetPromise = WidgetService.updateWidget(wgid,widget);
                    updateWidgetPromise
                        .success(function(widget){
                            //console.log(widget);
                        })
                        .error(function(){
                            console.log("Server error, widget could not be updated");
                        });

                }
            })
            .error(function(){
                console.log("Error in find widget by id!!");
            });
    }
})();
