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
                    created.author.id = req.user._id;
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
router.get("/campgrounds/:id/comments/:comment_id/edit", checkCommentsOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundcomment) {
        res.render("comments/edit", { comment: foundcomment, campground_id: req.params.id })
    })
})

router.put("/campgrounds/:id/comments/:comment_id", checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, { text: req.body.text }, function (err, updated) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id", checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

function checkCommentsOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundcomment) {
            if (err) {
                console.log(err)
            }
            else {
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back")
                }
            }
        })
    }
    else {
        res.redirect("back")
    }
}
module.exports = router;