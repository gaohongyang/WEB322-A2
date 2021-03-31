const express = require('express')
const router = express.Router();
const fakeDB = require("../model/FakeDB")

router.get("/", (req, res) => {
    res.render("General/index", {
        title: 'Home Page',
        featuredMovies: fakeDB.getFeaturedMovies(),
        featuredTV: fakeDB.getFeaturedTV(),
        deals: fakeDB.getAllDeals()
    })
})

router.get("/products", (req, res) => {
    res.render("General/products", {
        title: 'Movies || TV Shows',
        products: fakeDB.getAllProducts()
    })
})

router.get('/products/:id', (req, res) => {
    res.render("General/productDescription", {
        title: 'test',
        product: fakeDB.getAProduct(req.params.id)
    })
})

module.exports=router;