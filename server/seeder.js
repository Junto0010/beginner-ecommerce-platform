require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/productModel");
const products = require("./data/products");
const users = require("./data/users");
const User = require("./models/userModel");


connectDB();

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    // Insert users first
    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    // Attach admin user to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}