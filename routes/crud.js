const router = require("express").Router();
const crudModel = require('../models/crudModel.js');

// Renders the add page
router.get("/add", function(req, res) {
    res.render("add");
});

// Renders the edit page
// TODO (Will) - needs to take in a task object and pass it into the 
// pug layout so it can fill the fields in
router.get("/edit", function(req, res) {
    res.render("edit");
});

// Returns a list of task objects from the database
// So the frontend can render the list of tasks associated with a specific user
// req.query contains the username
router.get("/entries", function(req, res) {
    return res.json(crudModel.getEntries(req.query.username));
});

// Adds the item in req.body to the database
router.post("/addItem", function(req, res) {
    // return res.json(crudModel.addItem({ title: "task2", description: "desc2", priority: "5", deadline: "2/2/2005", status: "complete", username: "user"}));
    return res.json(crudModel.addItem(req.body));
});

// req.query has an id attribute that is the task_id of the item being removed
// Removes this item in the database
router.get("/removeItem", function(req, res) {
    return res.json(crudModel.removeItem(req.query.id));
});

// Updates the item specified in req.body in the database
router.post("/editItem", function(req, res) {
    // return res.json(crudModel.editItem({ title: "task2 new", description: "desc3", priority: "7", deadline: "2/2/2005", status: "in progress", id: 2}));
    return res.json(req.body);
});

module.exports = router;