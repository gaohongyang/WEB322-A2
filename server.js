const express =  require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const generalRoutes = require("./controllers/General")
const userRoutes = require("./controllers/User")

const app = express();

app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=>{
    if(req.query.method=="PUT"){
        req.method="PUT"
    }
    else if(req.query.method == "DELETE"){
        req.method = "DELETE"
    }
    next();
})

//session middleware
app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
}));

//global template engine variable for userInfo
app.use((req, res, next)=>{
    res.locals.user = req.session.userInfo;
    next();
})

const PORT = process.env.PORT || 3000;

app.use("/", generalRoutes);
app.use("/", userRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err => console.log(`Error occured when connecting to database ${err}`));


app.listen(PORT, () => {
    console.log(`Server is up and running`);
})