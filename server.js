const express = require("express");
const app = express();
require('dotenv').config();
const accountModel = require('./models/account.js');
const crudModel = require('./models/crud.js');

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

// Renders the create account page
app.get("/account", function(req, res) {
    res.render("create_account");
});

// Renders the home page
app.get("/home", function(req, res) {
    res.render("home");
});

// Renders the add page
app.get("/add", function(req, res) {
    res.render("add");
});

// Renders the edit page
// TODO (Will) - needs to take in a task object and pass it into the 
// pug layout so it can fill the fields in
app.get("/edit", function(req, res) {
    res.render("edit");
});

// Returns a list of task objects from the database
// So the frontend can render the list of tasks associated with a specific user
// req.query contains the username
app.get("/entries", function(req, res) {
    return res.json(crudModel.getEntries(req.query));
});

// Adds the item in req.body to the database
app.post("/addItem", function(req, res) {
    crudModel.addItem(req.body);
});

// req.query has an id attribute that is the task_id of the item being removed
// Removes this item in the database
app.get("/removeItem", function(req, res) {
    crudModel.removeItem(req.query.id);
});

// Updates the item specified in req.body in the database
app.post("/editItem", function(req, res) {
    crudModel.editItem(req.body);
});

// Creates the account in req.body in the databse
app.post("/createAccount", function(req, res) {
    accountModel.createAccount(req.body);
});

// Checks if the username and password in req.body match in the database, returns true/false
app.post("/authenticate", function(req, res) {
    return accountModel.authenticate(req.body);
})

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