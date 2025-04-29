// Functions used for creating and authenticating accounts
const db = require("../db_connection.js").db_connection;

// TODO (Will) test this
function getEntries(username) {
    let sql = 'SELECT * FROM Task WHERE user_name = $1';
    db.query(sql, [username])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

// TODO (Will) test this
// formData needs to contain the username
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

// TODO (Will) test this
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

// TODO (Will) test this
// formData needs to contain the task_id
function editItem(formData) {
    let sql = 'UPDATE Product SET title = $1, description = $2, priority = $3, deadline = $4, status = $5 WHERE task_id = $6';
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