module.exports = function() {
    var mongoose = require("mongoose");

    var ItemSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        ebayId: String,
        name: {type: String},
        description: String,
        type: {type: String, enum: ['SALE', 'EBAY'], default: 'EBAY'},
        category: String,
        condition: String,
        country: String,
        comments: [{type: String}],
        galleryURL: String,
        imageURL: String,
        paymentMethod: String,
        pictureURL: String,
        price: String,
        sellerLocation: String,
        url: String,
        userContact: String,
        /*
         condition: [{}],
         [{conditionId: ["1000"], conditionDisplayName: ["New"]}]
         country: ["US"]
         galleryURL
         :
         ["http://thumbs1.ebaystatic.com/m/mps6QKkJ_JZwF6_RO3v_yuA/140.jpg"]
         globalId
         :
         ["EBAY-US"]
         isMultiVariationListing
         :
         ["false"]
         itemId
         :
         ["282077905772"]
         listingInfo
         :
         [,…]
         location
         :
         ["Barstow,CA,USA"]
         paymentMethod
         :
         ["PayPal"]
         postalCode
         :
         ["92311"]
         primaryCategory
         :
         [{categoryId: ["38323"], categoryName: ["BeyBlade"]}]
         returnsAccepted
         :
         ["true"]
         sellingStatus
         :
         [{currentPrice: [{@currencyId: "USD", __value__: "14.76"}],…}]
         shippingInfo
         :
         [{shippingServiceCost: [{@currencyId: "USD", __value__: "0.0"}], shippingType: ["Free"],…}]
         title
         */
        posted: {type: Date, default: Date.now}
    }, {collection: 'prj_item'});

    return ItemSchema;
};