/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)

    function WidgetService($http, $routeParams){


        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sort : sort
        };
        return api;

        function sort(start, end){
            var pageId = $routeParams.pid;
            var url = "/page/"+pageId+"/widget?initial=" + start + "&final=" + end;
            $http.put(url);
        }


        function createWidget(pageId, widget){
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId){
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            var url = "/api/widget/"+widgetId;
            return $http.put(url,widget);
            //console.log(widgets);
        }

        function deleteWidget(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }
    }
})();