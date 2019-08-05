var express = require("express");
var router = express.Router();

var passport = require("passport")
var User = require("../models/user")

router.get("/", function (req, res) {
    res.render("Landing");
})

router.get("/register", function (req, res) {
    res.render("register")
})
router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        }
        else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to YeplCamp " + user.username)
                res.redirect("/campgrounds")
            })
        }
    })
})
router.get("/login", function (req, res) {
    res.render("login")
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
})

router.get("/logOut", function (req, res) {
    delete req._passport.session.user;
    req.flash("success", "Logged You Out")
    res.redirect("/campgrounds")
    // req.logout(function (err) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {

    //     }
    // })


    // req.session.destroy(function (err) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log(req.session)

    //     }
    // })
    // });
})

module.exports = router;