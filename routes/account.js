const router = require("express").Router();
const accountModel = require('../models/accountModel.js');

// Renders the create account page
router.get("/", function(req, res) {
    res.render("create_account");
});

// Creates the account in req.body in the databse
router.get("/createAccount", function(req, res) {
    accountModel.createAccount({ username: "user", password: "testpass" });
});

// Checks if the username and password in req.body match in the database, returns true/false
router.get("/authenticate", async function(req, res) {
    let token = await accountModel.authenticate({ username: "user", password: "badpass" });

    // console.log("moving on " + token);
    if(token.err) {
        // console.log("auth failure: " + token.err);
        res.status(401).json(token);
        return;
    } else {
        // console.log("auth success: " + token);
        return res.json(token);
    }
});

module.exports = router;