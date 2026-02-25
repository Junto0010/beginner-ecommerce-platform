require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
