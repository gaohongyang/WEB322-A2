const express =  require('express');
const router = express.Router();
const {signInMiddleware, registerMiddleware} = require("../middleware/customMiddleware")
const {isLoggedIn} = require('../middleware/authentication');
const {dashboardLoader} = require("../middleware/authorization");

require('dotenv').config({ path: 'config/keys.env'});

router.get("/dashBoard", (req, res)=>{
    res.render("User/dashBoard",{
        title: "Dash Board"
    })
})

router.get('/signIn', (req, res) => {
    res.render("User/signIn", {
        title: 'Sign In'
    })
})

router.post("/signIn", signInMiddleware)

router.get('/register', (req, res) => {
    res.render("User/register", {
        title: "Register"
    })
})

router.post('/register', registerMiddleware)

module.exports=router;