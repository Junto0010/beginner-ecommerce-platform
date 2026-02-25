const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//register user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

//login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {id: user._id },
            "secretkey",
            {expiresIn: "1d" }
        );

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});