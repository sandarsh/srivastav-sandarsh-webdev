module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api =
        {
            setModel : setModel,
            createWidget : createWidget,
            findAllWidgetsForPage : findAllWidgetsForPage,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
    return api;



    function deleteWidget(wid){
        return WidgetModel
            .remove({_id : wid});
    }

    function updateWidget(wgid, widget){
        return WidgetModel
            .update(
                {_id : wgid},
                {
                    name: widget.name,
                    text : widget.text,
                    placeholder : widget.placeholder,
                    description : widget.description,
                    url : widget.url,
                    width : widget.width,
                    height : widget.height,
                    // rows : widget.rows,
                    // size : widget.size,
                    class : widget.class,
                    icon : widget.icon,
                    // deletable : widget.deletable,
                    // formatted : widget.formatted
                }
            )
    }

    function findWidgetById(wid){
        return WidgetModel.findById(wid);
    }

    function findAllWidgetsForPage(pid){
        return model.PageModel.findAllWidgetsForPage(pid);
    }

    function createWidget(pid, widget){
        widget.pageId = pid;
        return WidgetModel
            .create(widget)
            .then(function(widget){
                model.PageModel.findPageById(pid)
                    .then(function(pageObj){
                        pageObj.widgets.push(widget);
                        return pageObj.save();
                    })
            });
    }


    function setModel(_model){
        model = _model;
    }
};