const sgMail = require('@sendgrid/mail')
const userModel = require("../model/User")
const bcrypt = require('bcryptjs');

exports.signInMiddleware=(req, res, next)=>{
    let emailError, passwordError;

    if(req.body.email == ""){
        emailError = "Pleas enter your email address.";
    }
    if(req.body.password == ""){
        passwordError = "Please enter your password.";
    }
    if(emailError || passwordError){
        res.render("User/signIn", {
            title: 'Sign In',
            emailError,
            passwordError,
            email: req.body.email,
            password: req.body.password
        })
    }
    else{
        userModel.findOne({email:req.body.email})
        .then(user=>{
            if(user==null){
                let error;
                error = "Sorry, your email and/or password is incorrect";
                res.render("User/signIn", {
                    error
                })
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                .then(isMatched=>{
                    if(isMatched){
                        req.session.userInfo = user;
                        res.redirect("/dashboard")
                    }
                    else{
                        error = "Sorry, your email and/or password is incorrect";
                        res.render("User/signIn",{
                            error
                        })
                    }
                })
                .catch(err=>console.log(`${err}`))
            }
        })
        .catch(err=>console.log(`${err}`))
    }
}

exports.registerMiddleware=(req, res, next)=>{
    let emailError, passwordError, nameError, addressError, cityError, postalCodeError;
    if(req.body.registerEmail === ""){
        emailError = "Please enter an email address."
    }
    else if(!req.body.registerEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        emailError = "Please enter a valid email address."
    }
    else if(userModel.find({email:req.body.email})){
        emailError = "Email address has been token, please use another one."
    }
    if(req.body.registerPassword === ""){
        passwordError = "Please enter a password."
    }
    else if(req.body.registerPassword.length < 6 || req.body.registerPassword.length > 12 || !req.body.registerPassword.match(/^[a-zA-Z0-9]+$/)){
        passwordError = "Please enter a valid password."
    }
    if(req.body.registerName === ""){
        nameError = "Please enter your full name."
    }
    if(req.body.registerAddress === ""){
        addressError = "Please enter your home address."
    }
    if(req.body.registerCity === ""){
        cityError = "Please enter the city name."
    }
    if(req.body.registerPostalCode === ""){
        postalCodeError = "Please enter your postal code."
    }
    else if(!req.body.registerPostalCode.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)){
        postalCodeError = "Please match the requested format."
    }
    if(emailError || passwordError || nameError || addressError || cityError || postalCodeError){
        res.render("User/register", {
            title: "Register",
            emailError,
            passwordError,
            nameError,
            addressError,
            cityError,
            postalCodeError,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            name: req.body.registerName,
            address: req.body.registerAddress,
            city: req.body.registerCity,
            postalCode: req.body.registerPostalCode,
            phone: req.body.registerPhone
        })
    }
    else{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.body.registerEmail,
            from: 'hgao42@myseneca.ca',
            subject: "Welcome to GAO's movie website",
            html: `
                <h1>Welcome to GAO's movie website</h1><br>
                <p>Hey ${req.body.registerName},</p>
                <p>Congratulations! You've successfully signed up for GAO's movie website, your login ID is: ${req.body.registerEmail}</P>
                <p>You may now:</P>
                <ul>
                    <li>Access you account</li>
                    <li>Buy or rent movies and TV shows</li>
                    <li>Subscribe for more exciting news</li>
                </ul>
                <br>
                <p>See you online</p>
                <p>GAO's movie team</P>
            `,
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            const newUser = {
                email: req.body.registerEmail,
                password: req.body.registerPassword,
                fullName: req.body.registerName,
                gender: req.body.gender,
                address: req.body.registerAddress,
                city: req.body.registerCity,
                postalCode: req.body.registerPostalCode,
                phone: req.body.registerPhone
            }
            const user = new userModel(newUser);
            user.save()
            .then(
                res.redirect("/dashBoard")
            )
            .catch(err=>console.log(`Error happened when registering user in the database: ${err}`))
        })
        .catch((error) => {
            console.error(error)
        })
    }
}