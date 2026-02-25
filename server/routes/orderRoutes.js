const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if(orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/myorders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;