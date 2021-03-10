const express =  require('express');
const exphbs  = require('express-handlebars');

const fakeDB = require("./model/FakeDB.js");

const app = express();

app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PORT = 3000;

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
    res.render("signIn")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.listen(PORT, () => {
    console.log(`Server is up and run at port ${PORT}`);
})