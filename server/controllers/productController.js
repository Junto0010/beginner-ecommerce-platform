const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const addProductReview = async (req, res) => {
    const { comment, rating } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if(alreadyReviewed) {
            return res.status(400).json({ message: "Product already reviewed" });
        }

        const review = {
            name: req.user.name,
            comment,
            rating: Number(rating),
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

module.exports = { addProductReview, };
