const express =  require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail')

const fakeDB = require("./model/FakeDB.js");

const generalRoutes = require("./controllers/General")
const userRoutes = require("./controllers/User")

const app = express();

app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use("/", generalRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running`);
})