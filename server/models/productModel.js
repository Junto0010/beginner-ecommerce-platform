const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
reviews:[{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}],
rating: {
    type: Number,
    required: true,
    default: 0
},
numReviews: {
    type: Number,
    required: true,
    default: 0
},
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;