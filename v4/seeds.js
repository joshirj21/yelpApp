var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// var campgrounds = [
//     { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "blah,blah,blah" },
//     { name: "Granite Hill", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "blah,blah,blah" },
//     { name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "blah,blah,blah" }
// ]

function seedDB() {
    // Campground.deleteMany({}, function (err, removed) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     for (var i = 0; i < campgrounds.length; i++) {
    //         Campground.create(campgrounds[i], function (err, created) {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 console.log("Added campground")
    //                 Comment.create({ text: "So cold", author: "homer" }, function (err, comment) {
    //                     if (err) {
    //                         console.log(err)
    //                     }
    //                     else {
    //                         created.comments.push(comment)
    //                         created.save();
    //                         console.log("Created new comment");
    //                     }
    //                 })
    //             }
    //         });
    //     }
    // });
}


module.exports = seedDB;

