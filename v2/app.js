var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/yelpApp', { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create({
//     name: "Mountain Goat's Rest",
//     image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     description: "This is a huge granite hill, no bathroom, nothing, just granite"
// }, function (err, campground) {
//     if (err) {
//         console.log("Error occured")
//     }
//     else {
//         console.log("Campground Created")
//         console.log(campground);
//     }
// })

// var campgrounds = [
//     { Name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Granite Hill", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Salmon Creek", image: "https://images.unsplash.com/photo-1476979735039-2fdea9e9e407?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Granite Hill", image: "https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Salmon Creek", image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { Name: "Granite hill", image: "https://images.unsplash.com/photo-1530488345268-51e6128cb132?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }
// ]



app.get("/", function (req, res) {
    res.render("Landing");
})

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campground) {
        if (err) {
            console.log("Error Occured")
        }
        else {
            res.render("index", { campgrounds: campground });
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
    res.render("new");
})

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("show", { found: found })
        }
    })
})
app.listen(3000, function () {
    console.log("Server has started")
})