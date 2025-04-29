// Functions used for Create, Read, Update, and Delete (CRUD) operations on the database
const db = require("../db_connection.js").db_connection;
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");

const secret = "secret";

// TODO (Will) test this
function createAccount(formData) {
    // Create user in database if it doesn't already exist
    if(!formData.username || !formData.password) {
        return false;
    }

    // Save password hashed
    const hash = bcrypt.hashSync(formData.password, 10);

    let sql = "INSERT INTO Usr (user_name, password) VALUES ($1, $2)";
    db.query(sql, [formData.username, hash])
        .then(result => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}

// TODO (Will) test this
function authenticate(formData) {
    if(!formData.username || !formData.password) {
        return { err: "Missing username and/or password" };
    }

    let sql = "SELECT password FROM Usr WHERE user_name = $1";
    db.query(sql, [formData.username])
        .then(result => {
            // check if username and password match the database
            // if so, issue a token
            if(bcrypt.compareSync(formData.password, result.rows[0].password)) {
                const token = jwt.encode({ username: username }, secret);
                return token;
            }
        })
        .catch(err => {
            return { err: "Database query encountered an error" };
        })
}

// to get the user's token (with username)
// const token = req.headers["x-auth"];
// const decoded = jwt.decode(token, secret);
// decoded.username

module.exports = {createAccount, authenticate}