const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.set("views", "views");
app.set("view engine", "pug");

app.get("/", function(req, res) {
    res.render("home");
});

app.listen(3018, function() {
    console.log("Listening on port 3018...");
});