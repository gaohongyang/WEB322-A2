const express =  require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail')

const fakeDB = require("./model/FakeDB.js");

const app = express();

require('dotenv').config({ path: 'config/keys.env' });

app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render("index", {
        title: 'Home Page',
        featuredMovies: fakeDB.getFeaturedMovies(),
        featuredTV: fakeDB.getFeaturedTV(),
        deals: fakeDB.getAllDeals()
    })
})

app.get('/products', (req, res) => {
    res.render("products", {
        title: 'Movies || TV Shows',
        products: fakeDB.getAllProducts()
    })
})

app.get('/products/:id', (req, res) => {
    res.render("productDescription", {
        title: 'test',
        product: fakeDB.getAProduct(req.params.id)
    })
})

app.get('/signIn', (req, res) => {
    res.render("signIn", {
        title: 'Sign In'
    })
})

app.post("/signIn", (req, res)=>{
    let emailError, passwordError;

    if(req.body.email == ""){
        emailError = "Pleas enter your email address.";
    }
    if(req.body.password == ""){
        passwordError = "Please enter your password.";
    }
    if(emailError || passwordError){
        res.render("signIn", {
            title: 'Sign In',
            emailError,
            passwordError,
            email: req.body.email,
            password: req.body.password
        })
    }
    else{
        res.render("signIn", {
            title: 'Sign In'
        })
    }
})

app.get('/register', (req, res) => {
    res.render("register", {
        title: "Register"
    })
})

app.post('/register', (req, res)=>{
    let emailError, passwordError, nameError, addressError, cityError, postalCodeError;
    if(req.body.registerEmail === ""){
        emailError = "Please enter an email address."
    }
    else if(!req.body.registerEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        emailError = "Please enter a valid email address."
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
        res.render("register", {
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
            res.redirect("/dashBoard")
        })
        .catch((error) => {
            console.error(error)
        })
    }
})

app.get("/dashBoard", (req, res)=>{
    res.render("dashBoard",{
        title: "Dash Board"
    })
})

app.listen(PORT, () => {
    console.log(`Server is up and running`);
})