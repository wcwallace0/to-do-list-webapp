const router = require("express").Router;
const accountModel = require('./models/accountModel.js');

// Renders the create account page
app.get("/", function(req, res) {
    res.render("create_account");
});

// Creates the account in req.body in the databse
app.post("/createAccount", function(req, res) {
    accountModel.createAccount(req.body);
});

// Checks if the username and password in req.body match in the database, returns true/false
app.post("/authenticate", function(req, res) {
    return accountModel.authenticate(req.body);
});

module.exports = router;