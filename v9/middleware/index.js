// All the middleware goes here
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                res.redirect("back")
            }
            else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("/campgrounds/" + req.params.id)
                }
            }
        })
    }
    else {
        res.redirect("/login")
    }
};

middlewareObj.checkCommentsOwnership = function (req, res, next) {
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
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}
module.exports = middlewareObj;

