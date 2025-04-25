const express = require("express");
const app = express();
require('dotenv').config();
const db = require("./db_connection.js").db_connection;

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.set("views", "views");
app.set("view engine", "pug");

app.get("/", function(req, res) {
    // testDatabaseConnection();
    res.render("home");
});

app.listen(3018, function() {
    console.log("Listening on port 3018...");
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