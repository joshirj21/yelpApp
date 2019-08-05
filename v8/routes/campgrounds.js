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
            created.author.id = req.user._id;
            created.author.username = req.user.username
            created.save();
            res.redirect("/campgrounds")
        }
    })
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
            res.render("campgrounds/show", { found: found })
        }
    })
})
// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("campgrounds/edit", { campground: campground })
    })
})
//PUT ROUTE
router.put("/campgrounds/:id", function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, { name: req.body.name, image: req.body.image, description: req.body.description }, function (err, updated) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


router.delete("/campgrounds/:id", checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campgrounds")
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

function checkCampgroundOwnership(req, res, next) {
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

}
module.exports = router;