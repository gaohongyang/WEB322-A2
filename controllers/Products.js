const express = require('express')
const router = express.Router();
const path = require('path');
const productModel = require('../model/Products');
const {isLoggedIn,isAdmin} = require('../middleware/authentication');

router.get("/addProduct-admin",isLoggedIn, isAdmin, (req, res)=>{
    productModel.find()
    .then((products)=>{
        const productArr = products.map(product => product);
        const index = productArr.length + 1;
        res.render("Products/addProduct", {
            index
        });
    })
    .catch(err=>console.log(`${err}`))
})

router.post("/addProduct-admin",(req, res)=>{
    const newProduct = {
        title: req.body.title,
        index: req.body.index,
        rating: req.body.rating,
        category: req.body.category,
        rentPrice: req.body.rentPrice,
        sellPrice: req.body.sellPrice,
        description: req.body.description,
        featured: req.body.featured
    }
    const product = new productModel(newProduct);
    product.save()
    .then((product)=>{
        req.files.smallPoster.name = `${product.index}${path.parse(req.files.smallPoster.name).ext}`
        req.files.smallPoster.mv(`public/uploads/${req.files.smallPoster.name}`)
        req.files.largePoster.name = `${product.index}-bg${path.parse(req.files.largePoster.name).ext}`
        req.files.largePoster.mv(`public/uploads/${req.files.largePoster.name}`)
        .then(()=>{
            productModel.updateOne({_id:product._id},{
                smallPoster: req.files.smallPoster.name,
                largePoster: req.files.largePoster.name
            })
            .then(()=>{
                res.redirect('/dashBoard')
            })
            .catch(err=>console.log(`Error happened when updating files: ${err}`))
        })
        .catch(err=>console.log(`Error happened when uploading files: ${err}`))
    })
    .catch(err=>console.log(`Error happened when saving new product: ${err}`))
})

module.exports=router;