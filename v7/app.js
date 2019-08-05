var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var passport = require("passport")
var localStrategy = require("passport-local")
var User = require("./models/user")

var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelpApp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "i want to get laid",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000, function () {
    console.log("Server has started")
})