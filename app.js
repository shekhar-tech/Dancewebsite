
const path = require('path');
const port = 80;
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

// getting-started.js 
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
//checking mongodb connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

//writing schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    Phone: Number,
    Email: String,
    DOB: String,
    Gender: String
});

///making model
var Contact = mongoose.model('Contact', ContactSchema);




//express related files
// app.use(express.static("static", options));
app.use("/static", express.static("static"));
app.use(express.urlencoded());


//pug related activities
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//GEt endpoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render("home.pug", params);
})
//GEt endpoints
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render("contact.pug", params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("the contact has been submitted in database")
    }).catch(() => {
        res.status(400).send("items cannot be pushed into the database");
    })

})





//endpoints
app.listen(port, () => {
    console.log(`application running sucessfully at ${port}`);
})