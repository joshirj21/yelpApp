var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var seedDB = require("./seeds")

mongoose.connect('mongodb://localhost:27017/yelpApp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

seedDB();

app.get("/", function (req, res) {
    res.render("Landing");
})

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campground) {
        if (err) {
            console.log("Error Occured")
        }
        else {

            res.render("campgrounds/index", { campgrounds: campground });
        }
    })
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    Campground.create({ name: name, image: image, description: req.body.description }, function (err, created) {
        if (err) {
            console.log(err)
        }
        else {
            // console.log("New Campground Created")
            res.redirect("/campgrounds")
        }
    })

    //get data from form
    //redirect back to campgrounds
})

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
})

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            // console.log(found);
            res.render("campgrounds/show", { found: found })
        }
    })
})

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("comments/new", { campground: found })
        }
    })
})

app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            Comment.create({ text: req.body.text, author: req.body.author }, function (err, created) {
                if (err) {
                    console.log(err)
                }
                else {
                    found.comments.push(created);
                    found.save();
                    res.redirect("/campgrounds/" + req.params.id)
                }
            })
        }
    })
})
app.listen(3000, function () {
    console.log("Server has started")
})