var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs");

var campgrounds = [
    { Name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" },
    { Name: "Granite Hill", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f762e78d6974bc0_340.jpg" },
    { Name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" },
    { Name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" },
    { Name: "Granite Hill", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f762e78d6974bc0_340.jpg" },
    { Name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" },
    { Name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" },
    { Name: "Granite Hill", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f762e78d6974bc0_340.jpg" },
    { Name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732c7ad7954dc35d_340.jpg" }
]

app.get("/", function (req, res) {
    res.render("Landing");
})

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", { campgrounds: campgrounds });
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({ Name: name, image: image })
    res.redirect("/campgrounds")
    //get data from form
    //redirect back to campgrounds
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})
app.listen(3000, function () {
    console.log("Server has started")
})