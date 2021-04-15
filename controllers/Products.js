const express = require('express')
const router = express.Router();
const path = require('path');
const productModel = require('../model/Products');
const {isLoggedIn,isAdmin} = require('../middleware/authentication');

router.get("/addProduct-admin",isLoggedIn, isAdmin, (req, res)=>{
    productModel.find()
    .then((products)=>{
        res.render("Products/addProduct");
    })
    .catch(err=>console.log(`${err}`))
})

router.post("/addProduct-admin", (req, res, next)=>{
    const newProduct = {
        title: req.body.title,
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
        let smallErr, largeErr;
        let ext = ['.jpg', '.gif', '.png']
        if(req.files.smallPoster && ext.includes(path.parse(req.files.smallPoster.name).ext)){
            req.files.smallPoster.name = `${product._id}${path.parse(req.files.smallPoster.name).ext}`
            req.files.smallPoster.mv(`public/uploads/${req.files.smallPoster.name}`)
            .then(()=>{
                productModel.updateOne({_id:product._id},{
                    smallPoster: req.files.smallPoster.name
                })
                .then(()=>{
                    next();
                })
                .catch(err=>console.log(`Error: ${err}`))
            })
            .catch(err=>console.log(`Error: ${err}`))
        }
        else{
            smallErr = "Small poster is not uploaded."
        }
        if(req.files.largePoster && ext.includes(path.parse(req.files.largePoster.name).ext)){
            req.files.largePoster.name = `${product._id}-bg${path.parse(req.files.largePoster.name).ext}`
            req.files.largePoster.mv(`public/uploads/${req.files.largePoster.name}`)
            .then(()=>{
                productModel.updateOne({_id:product._id},{
                    largePoster: req.files.largePoster.name
                })
                .then(()=>{
                    next();
                })
                .catch(err=>console.log(`Error: ${err}`))
            })
            .catch(err=>console.log(`Error: ${err}`))
        }
        else{
            largeErr = "large poster is not uploaded."
        }
        res.render("Products/addProduct", {
            smallErr,
            largeErr
        })
    })
    .catch(err=>console.log(`Error happened when saving new product: ${err}`))
})

router.get("/productsList-admin",isLoggedIn, isAdmin, (req, res)=>{
    productModel.find()
    .then((products)=>{
        const filteredProducts = products.map(product=>{
            let isFeatured = product.featured? "Yes" : "No";
            return {
                _id: product._id,
                title: product.title,
                category: product.category,
                rating: product.rating,
                sellPrice: product.sellPrice,
                rentPrice: product.rentPrice,
                isFeatured
            }
        });
        res.render("Products/productsDashboard",{
            title: "List",
            data: filteredProducts
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/editProduct/:id",isLoggedIn, isAdmin,(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        const{title, description, category, rating, sellPrice, rentPrice, featured, _id, smallPoster, largePoster} = product;
        let isMovie = category === "Movie"? true : false;
        res.render("Products/editProduct",{
            title: "Edit",
            productTitle: title,
            _id,
            description,
            isMovie,
            rating,
            sellPrice,
            rentPrice,
            featured,
            smallPoster,
            largePoster
        });
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.put("/update/:id", (req, res)=>{
    const updatedProduct = {
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        rentPrice: req.body.rentPrice,
        sellPrice: req.body.sellPrice,
        description: req.body.description,
        featured: req.body.featured
    }
    if(req.files.smallPoster){
        req.files.smallPoster.name = `${req.params.id}${path.parse(req.files.smallPoster.name).ext}`
        req.files.smallPoster.mv(`public/uploads/${req.files.smallPoster.name}`)
        .then(()=>{
            updatedProduct.smallPoster = req.files.smallPoster.name;
        })
        .catch(err=>console.log(`Error: ${err}`))
    }
    if(req.files.largePoster){
    req.files.largePoster.name = `${req.params.id}-bg${path.parse(req.files.largePoster.name).ext}`
    req.files.largePoster.mv(`public/uploads/${req.files.largePoster.name}`)
    .then(()=>{
        updatedProduct.largePoster = req.files.largePoster.name;
    })
    .catch(err=>console.log(`Error: ${err}`))
    }
    productModel.updateOne({_id:req.params.id}, updatedProduct)
    .then(()=>{
        res.redirect(`/`)
    })
    .catch()
})

router.delete("/delete/:id", (req, res)=>{
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/productsList-admin")
    })
    .catch(err=>console.log(`Error: ${err}`))
})

module.exports=router;