module.exports = function() {

    var mongoose = require("mongoose");
    var ItemSchema = require("./item.schema.server.js")();
    var ItemModel = mongoose.model("ItemModel", ItemSchema);

    var api = {
        addItem: addItem,
        addToCart: addToCart,
        createItem: createItem,
        findAllItems: findAllItems,
        findById: findById,
        findItemByEbayId: findItemByEbayId,
        removeItem: removeItem,
        searchAllItemsForSale: searchAllItemsForSale,
        setModel: setModel,
        updateItem: updateItem,
        uploadImage: uploadImage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function addItem(uid, item) {
        return ItemModel
            .create(item)
            .then(
                function (itemObj) {
                    model.userModel
                        .findUserById(uid)
                        .then(
                            function (userObj) {
                                userObj.itemHistory.push(itemObj);
                                //itemObj._user = userObj._id;
                                itemObj.save();
                                userObj.save();
                                return itemObj;
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        );
                    return itemObj;
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findItemByEbayId(itemId) {
        return ItemModel
            .findOne({
                ebayId: itemId
            });
    }

    function addToCart(uid, item) {
        return model
            .userModel
            .findUserById(uid)
            .then(
                function (userObj) {
                    userObj.itemCart.push(item);
                    userObj.save();
                    return userObj;
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }


    function searchAllItemsForSale(uid) {
        return model
            .userModel
            .findUserById(uid)
            .populate("itemForSale")
            .exec();
    }

    function createItem(uid, item) {
        item.type = 'SALE';
        return ItemModel
            .create(item)
            .then(
                function(itemObj) {
                    model
                        .userModel
                        .findUserById(uid)
                        .then(
                            function(userObj) {
                                userObj.itemForSale.push(itemObj);
                                itemObj._user = userObj._id;
                                userObj.save();
                                itemObj.save();
                                return itemObj;
                            },
                            function(error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function(error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findById(itemId) {
        return ItemModel.findById(itemId);
    }

    function updateItem(item, itemId) {
        return ItemModel
            .update(
                {
                    _id: itemId
                },
                {
                    name: item.name,
                    category: item.category,
                    condition: item.condition,
                    sellerLocation: item.sellerLocation,
                    country: item.country,
                    description: item.description,
                    price: item.price,
                    galleryURL: item.galleryURL,
                    userContact: item.userContact
                }
            );
    }

    function uploadImage(itemId, localUrl) {
        return ItemModel
            .update(
                {
                    _id: itemId
                },
                {
                    galleryURL: localUrl
                }
            );
    }

    function removeItem(uid, itemId) {
        return ItemModel
            .remove({
                _id: itemId
            })
            .then(
                function (status) {
                    model.userModel
                        .findUserById(uid)
                        .then(
                            function (userObj) {
                                userObj.itemForSale.remove({
                                    _id: itemId
                                });
                                return userObj.save();
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findAllItems() {
        return ItemModel.find();
    }
};
