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
function getEntries(username) {
    let sql = "SELECT * FROM Task WHERE user_name = $1";
    db.query(sql, [username])
        .then(result => {
            console.log(result.rows);
            return result.rows;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
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
function addItem(formData) {
    let sql = 'INSERT INTO Task (title, description, priority, deadline, status, user_name) VALUES ($1, $2, $3, $4, $5, $6)';
    db.query(sql, [formData.title, formData.description, formData.priority, formData.deadline, formData.status, formData.username])
        .then(result => {
            console.log(result);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

// Takes in an id and removes the task in the database with that task_id
function removeItem(task_id) {
    let sql = 'DELETE FROM Task WHERE task_id = $1';
    db.query(sql, [task_id])
        .then(result => {
            console.log(result);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
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
function editItem(formData) {
    let sql = 'UPDATE Task SET title = $1, description = $2, priority = $3, deadline = $4, status = $5 WHERE task_id = $6';
    db.query(sql, [formData.title, formData.description, formData.priority, formData.deadline, formData.status, formData.id])
        .then(result => {
            console.log(result);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

module.exports = {getEntries, addItem, removeItem, editItem};