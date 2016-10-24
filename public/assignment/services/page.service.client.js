/**
 * Created by sandarshsrivastav on 12/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Test Title" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Test Title" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Test Title" }
        ];

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId){
            var page;
            var res = [];
            for(page in pages){
                if(pages[page].websiteId === websiteId){
                    res.push(pages[page]);
                }
            }
            return res;
        }

        function findPageById(pageId){
            var page;
            for(page in pages){
                if(pages[page]._id === pageId){
                    return pages[page];
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            var pg;
            for(pg in pages){
                if(pages[pg]._id === pageId){
                    pages[pg].name = page.name;
                    pages[pg].title = page.title;
                    pages[pg].websiteId = page.websiteId;
                    break;
                }
            }
        }



        function deletePage(pageId){
            var page;
            var ind;
            for(page in pages){
                if(pages[page]._id === pageId){
                    ind = page;
                    break;
                }
            }
            pages.splice(ind,1);
        }
    }
})();