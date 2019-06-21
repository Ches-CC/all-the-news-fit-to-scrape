var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var mongoose = require("mongoose");
var db = require("./app/models");
var path = require("path");
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");

// Mongoose Connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapes_DB";
mongoose.connect(MONGODB_URI), { useNewUrlParser: true };
app.use(bodyParser.json());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/app/public"));
// app.use(express.static("public"));


// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    res.render("index");
});

// Routes
var apiRoutes = require("./app/routes/apiRoutes");
app.use("/apiRoutes", apiRoutes);
require("./app/routes/apiRoutes")(app);

// The Server Starter
app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});
