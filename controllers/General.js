const express = require('express')
const router = express.Router();
const productModel = require('../model/Products');

router.get("/", (req, res) => {
    productModel.find({featured: true, category: "Movie"})
    .then((featuredMovies)=>{
        const filteredFeaturedMovies = featuredMovies.map(movie=>{
            return{
                _id: movie._id,
                smallPoster: movie.smallPoster
            }
        });
        productModel.find({featured: true, category: "TV Show"})
        .then((featuredShows)=>{
            const filteredFeaturedShows = featuredShows.map(show=>{
                return{
                    _id: show._id,
                    smallPoster: show.smallPoster
                }
            });
            res.render("General/index", {
                title: 'Home Page',
                filteredFeaturedMovies,
                filteredFeaturedShows
            })
        })
        .catch(err=>console.log(`Error: ${err}`))
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/products", (req, res) => {
    productModel.find()
    .then((products)=>{
        const allProducts = products.map(product=>{
            return{
                _id: product._id,
                title: product.title,
                smallPoster: product.smallPoster
            }
        });
        res.render("General/products", {
            title: "Movies || TV Shows",
            products: allProducts
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get('/products/:id', (req, res) => {
    productModel.findById(req.params.id)
    .then((product)=>{
        const{largePoster, smallPoster, title, description, sellPrice, rentPrice, rating, _id} = product;
        res.render("General/productDescription", {
            title: "Description",
            productTitle: title,
            largePoster,
            smallPoster,
            description,
            sellPrice,
            rentPrice,
            rating,
            _id
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

module.exports=router;