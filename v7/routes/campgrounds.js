var express = require("express");
var router = express.Router();

var Campground = require("../models/campground")

router.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campground) {
        if (err) {
            console.log("Error Occured")
        }
        else {

            res.render("campgrounds/index", { campgrounds: campground });
        }
    })
})

router.post("/campgrounds", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    Campground.create({ name: name, image: image, description: req.body.description }, function (err, created) {
        if (err) {
            console.log(err)
        }
        else {
            created.author._id = req.user._id;
            created.author.username = req.user.username
            created.save();
            res.redirect("/campgrounds")
        }
    })

    //get data from form
    //redirect back to campgrounds
})

router.get("/campgrounds/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

router.get("/campgrounds/:id", function (req, res) {
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
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}
module.exports = router;