const express = require('express')
const router = express.Router();
const path = require('path');
const productModel = require('../model/Products');
const sellModel = require('../model/Sell');
const rentModel = require('../model/Rent');
const orderModel = require('../model/Order');
const {isLoggedIn,isAdmin} = require('../middleware/authentication');
const sgMail = require('@sendgrid/mail');

router.get("/addProduct-admin",isLoggedIn, isAdmin, (req, res)=>{
    res.render("Products/addProduct")
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
        let ext = ['.jpg', '.gif', '.png'];
        if(req.files && ext.includes(path.parse(req.files.smallPoster.name).ext)){
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
        if(req.files && ext.includes(path.parse(req.files.largePoster.name).ext)){
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

router.put("/update/:id", (req, res, next)=>{
    let ext = ['.jpg', '.gif', '.png']
    const updatedProduct = {
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        rentPrice: req.body.rentPrice,
        sellPrice: req.body.sellPrice,
        description: req.body.description,
        featured: req.body.featured
    }
    if(req.files && ext.includes(path.parse(req.files.smallPoster.name).ext)){
        req.files.smallPoster.name = `${req.params.id}${path.parse(req.files.smallPoster.name).ext}`
        req.files.smallPoster.mv(`public/uploads/${req.files.smallPoster.name}`)
        .then(()=>{
            productModel.updateOne({_id:req.params.id},{
                smallPoster: req.files.smallPoster.name
            })
            .then(()=>{
                next();
            })
            .catch(err=>console.log(`Error: ${err}`))
        })
        .catch(err=>console.log(`Error: ${err}`))
    }
    if(req.files && ext.includes(path.parse(req.files.largePoster.name).ext)){
        req.files.largePoster.name = `${req.params.id}-bg${path.parse(req.files.largePoster.name).ext}`
        req.files.largePoster.mv(`public/uploads/${req.files.largePoster.name}`)
        .then(()=>{
            productModel.updateOne({_id:req.params.id},{
                largePoster: req.files.largePoster.name
            })
            .then(()=>{
                next();
            })
            .catch(err=>console.log(`Error: ${err}`))
        })
        .catch(err=>console.log(`Error: ${err}`))
    }
    productModel.updateOne({_id:req.params.id}, updatedProduct)
    .then(()=>{
        res.redirect("/dashBoard")
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.delete("/delete/:id", (req, res)=>{
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/productsList-admin")
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/search-result", (req, res)=>{
    productModel.find({title:req.query.term})
    .then((products)=>{
        let noResult;
        const filteredProducts = products.map(product=>{
            return {
                _id: product._id,
                title: product.title,
                smallPoster: product.smallPoster
            }
        })
        if(filteredProducts.length === 0){
            noResult = "There is nothing found in our database, please try another one."
        }
        res.render("Products/searchResult", {
            filteredProducts,
            noResult
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/sell-cart", isLoggedIn, (req, res)=>{
    sellModel.find({userId:req.session.userInfo._id})
    .then((sellProds)=>{
        const filteredSell = sellProds.map(elem=>{
            return {
                _id: elem._id,
                title: elem.title,
                sell: elem.sell
            }
        })
        res.render("User/purchaseCart", {
            filteredSell
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.delete("/deleteSell/:id", isLoggedIn, (req, res)=>{
    sellModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/sell-cart")
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.post("/sell-cart", isLoggedIn, (req, res)=>{
    productModel.findOne({_id:req.body.sell})
    .then((product)=>{
        const newSell = {
            title: product.title,
            sell: product.sellPrice,
            userId: req.session.userInfo._id
        }
        const sell = new sellModel(newSell);
        sell.save()
        .then(
            res.redirect("/products")
        )
        .catch(err=>console.log(`Error: ${err}`))
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/rent-cart", isLoggedIn, (req, res)=>{
    rentModel.find({userId:req.session.userInfo._id})
    .then((rentProds)=>{
        const filteredRent = rentProds.map(elem=>{
            return {
                _id: elem._id,
                title: elem.title,
                rent: elem.rent,
                location: elem.location,
                time: elem.time
            }
        })
        res.render("User/rentCart", {
            filteredRent
        })
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.post("/rent-cart", isLoggedIn, (req, res)=>{
    productModel.findOne({_id:req.body.rent})
    .then((product)=>{
        const newRent = {
            title: product.title,
            rent: product.rentPrice,
            userId: req.session.userInfo._id
        }
        const rent = new rentModel(newRent);
        rent.save()
        .then(
            res.redirect("/products")
        )
        .catch(err=>console.log(`Error: ${err}`))
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.delete("/deleteRent/:id", isLoggedIn, (req, res)=>{
    rentModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/rent-cart")
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.get("/check-out", isLoggedIn, (req, res)=>{
    let sellPrice = 0, rentPrice = 0, total = 0, HTS = 0, pay = 0;
    rentModel.find({userId:req.session.userInfo._id})
    .then((rentProds)=>{
        const filteredRent = rentProds.map(elem=>{
            return {
                _id: elem._id,
                title: elem.title,
                rent: elem.rent
            }
        })
        sellModel.find({userId:req.session.userInfo._id})
        .then((sellProds)=>{
            const filteredSell = sellProds.map(elem=>{
                return {
                    _id: elem._id,
                    title: elem.title,
                    sell: elem.sell
                }
            })
            filteredSell.forEach(element=> sellPrice += Number(element.sell))
            filteredRent.forEach(element=> rentPrice += Number(element.rent))
            total = sellPrice + rentPrice;
            HST = (total * 0.13).toPrecision(2);
            pay = total + Number(HST);
            res.render("User/checkout", {
                filteredSell,
                filteredRent,
                total,
                HST,
                pay
            })
        })
        .catch(err=>console.log(`Error: ${err}`))
    })
    .catch(err=>console.log(`Error: ${err}`))
})

router.post("/check-out", isLoggedIn, (req, res)=>{
    const newOrder = {
        sellTitle: req.body.sellTitle,
        rentTitle: req.body.rentTitle,
        pay: req.body.pay,
        userId: req.session.userInfo._id
    }
    const order = new orderModel(newOrder);
    order.save()
    .then((order)=>{
        rentModel.deleteMany({userId:order.userId})
        .then(()=>{
            sellModel.deleteMany({userId:order.userId})
            .then(()=>{
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: req.session.userInfo.email,
                    from: 'hgao42@myseneca.ca',
                    subject: "Thank you for your purchase",
                    html: `
                        <h5>Thank you for you purchase on GAO's movie website</h5><br>
                        <p>Hi ${req.session.userInfo.fullName},</p>
                        <p>Your order has been completed</P>
                        <p>You ordered ${order.sellTitle},${order.rentTitle}</P>
                        <p>Payment: ${order.pay}</p>
                        <br>
                        <p>Thank you,</p>
                        <p>GAO's movie team</P>
                    `,
                }
                sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                    res.redirect("/dashBoard")
                })
                .catch(err=>console.log(`Error: ${err}`))
            })
            .catch(err=>console.log(`Error: ${err}`))
        })
        .catch(err=>console.log(`Error: ${err}`))
    })
    .catch(err=>console.log(`Error: ${err}`))
})

module.exports=router;