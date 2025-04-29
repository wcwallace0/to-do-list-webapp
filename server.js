const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
account = require("./routes/account.js");
crud = require("./routes/crud.js");

app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.set("views", "views");
app.set("view engine", "pug");

// Renders the login page
app.get("/", function(req, res) {
    res.render("login");
});

app.listen(3018, function() {
    console.log("Listening on port 3018...");
});

app.use("/account", account);
app.use("/crud", crud);

// Renders the home page
app.get("/home", function(req, res) {
    res.render("home");
});

function testDatabaseConnection() {
    let sql = "SELECT * FROM Usr";
    db.query(sql)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}