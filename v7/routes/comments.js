var express = require("express");
var router = express.Router();

var Campground = require("../models/campground")
var Comment = require("../models/comment")

router.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("comments/new", { campground: found })
        }
    })
})

router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            Comment.create({ text: req.body.text }, function (err, created) {
                if (err) {
                    console.log(err)
                }
                else {
                    created.author._id = req.user._id;
                    created.author.username = req.user.username;
                    created.save();
                    found.comments.push(created);
                    found.save();
                    res.redirect("/campgrounds/" + req.params.id)
                }
            })
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