// Functions used for creating and authenticating accounts
const db = require("../db_connection.js").db_connection;

// Takes a username and returns a list of all the tasks associated with that user
// Each task has the following structure
/* {
    title:
    description:
    priority:
    deadline:
    status:
    user_name:
} */
async function getEntries(username) {
    let sql = "SELECT * FROM Task WHERE user_name = $1";
    let result = await db.query(sql, [username]);
    console.log("getEntries result ", result.rows);
    return result.rows;
}

// Takes in formData with the following structure, adds the item to the database
/* {
    title:
    description:
    priority:
    deadline:
    status:
    user_name:
} */
async function addItem(formData) {
    let priority = formData.priority ? formData.priority : null;

    let sql = 'INSERT INTO Task (title, description, priority, deadline, status, user_name) VALUES ($1, $2, $3, $4, $5, $6)';
    let result = await db.query(sql, [formData.title, formData.description, priority, formData.deadline, formData.status, formData.username]);
    console.log("Add item result ", result);
    return true;
}

// Takes in an id and removes the task in the database with that task_id
async function removeItem(task_id) {
    let sql = 'DELETE FROM Task WHERE task_id = $1';
    let result = await db.query(sql, [task_id]);
    console.log("Remove item result ", result);
    return true;
}

// Takes formData with the below structure, edits the item with the specified id
// to take on the new values specified
// formData needs to contain the task_id
/* {
    title:
    description:
    priority:
    deadline:
    status:
    id:
} */
async function editItem(formData) {
    let priority = formData.priority ? formData.priority : null;

    let sql = 'UPDATE Task SET title = $1, description = $2, priority = $3, deadline = $4, status = $5 WHERE task_id = $6';
    let result = await db.query(sql, [formData.title, formData.description, priority, formData.deadline, formData.status, formData.task_id]);
    console.log("Edit item result ", result);
    return true;
}

module.exports = {getEntries, addItem, removeItem, editItem};