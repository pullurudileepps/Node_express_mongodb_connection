const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
/** connection ends */

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, min: 0 },
    specs: { type: Object },
});
const Product = mongoose.model("product", productSchema);

// Your code goes here

app.get("/products", async (req, res) => {
    try {
        const data = await Product.find({});
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err);
    }
})

app.post("/products", async (req, res) => {
    try {
        const { name, brand, price, specs } = req.body
        const data = await Product.create({
            name: name,
            brand: brand,
            price: price,
            specs: specs
        })
        res.status(201).json(data)
    } catch (err) {
        res.status(400).json(err);
    }
})
module.exports = { app, Product };
