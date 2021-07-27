"use strict";

var path = require('path');

var port = 80;

var express = require('express');

var app = express(); //express related files
// app.use(express.static("static", options));

app.use("/static", express["static"]("static"));
app.use(express.urlencoded()); //pug related activities

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //GEt endpoints

app.get('/', function (req, res) {
  var params = {};
  res.status(200).render("home.pug", params);
}); //GEt endpoints

app.get('/contact', function (req, res) {
  var params = {};
  res.status(200).render("contact.pug", params);
}); //endpoints

app.listen(port, function () {
  console.log("application running sucessfully at ".concat(port));
});