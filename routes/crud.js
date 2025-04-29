const router = require("express").Router();
const crudModel = require('../models/crudModel.js');
const jwt = require("jwt-simple");
const cors = require("cors");

router.use(cors());

const secret = "secret";

// Renders the add page
router.get("/add", function(req, res) {
    res.render("add");
});

// Renders the edit page
router.get("/edit", function(req, res) {
    res.render("edit");
});

// Returns a list of task objects from the database
// So the frontend can render the list of tasks associated with a specific user
// req.query contains the username
router.get("/entries", async function(req, res) {
    // to get the user's token (with username)
    console.log(req.query.username);
    const decoded = jwt.decode(req.query.username, secret);
    return res.json(await crudModel.getEntries(decoded.username));
});

// Adds the item in req.body to the database
router.post("/addItem", async function(req, res) {
    let decoded = await jwt.decode(req.body.username, secret);
    let formData = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        deadline: req.body.deadline,
        status: req.body.status,
        username: decoded.username
    }
    await crudModel.addItem(formData);
    res.redirect("/home");
});

// req.query has an id attribute that is the task_id of the item being removed
// Removes this item in the database
router.get("/removeItem", async function(req, res) {
    return res.json(await crudModel.removeItem(req.query.task_id));
});

// Updates the item specified in req.body in the database
router.post("/editItem", async function(req, res) {
    // return res.json(crudModel.editItem({ title: "task2 new", description: "desc3", priority: "7", deadline: "2/2/2005", status: "in progress", id: 2}));
    return res.json(await crudModel.editItem(req.body));
});

module.exports = router;