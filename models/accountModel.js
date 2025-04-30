// Functions used for Create, Read, Update, and Delete (CRUD) operations on the database
const db = require("../db_connection.js").db_connection;
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");

const secret = "secret";

// Takes in an object with a .username field and a .password field (from the create account form)
async function createAccount(formData) {
    // Create user in database if it doesn't already exist
    if(!formData.username || !formData.password) {
        return false;
    }

    let sql = "SELECT * FROM Usr WHERE user_name = $1";
    let result = await db.query(sql, [formData.username]);

    if(result.rows.length == 0) {
        // Save password hashed
        const hash = await bcrypt.hashSync(formData.password, 10);

        let sql2 = "INSERT INTO Usr (user_name, password) VALUES ($1, $2)";
        let result2 = await db.query(sql2, [formData.username, hash]);
    }
}

// Takes in an object with a .username field and a .password field (from the create account form)
async function authenticate(formData) {
    if(!formData.username || !formData.password) {
        return { err: "Missing username and/or password" };
    }

    let sql = "SELECT password FROM Usr WHERE user_name = $1";
    let result = await db.query(sql, [formData.username]);
    // check if username and password match the database
    if(result.rows[0]) {
        // if so, issue a token
        if(bcrypt.compareSync(formData.password, result.rows[0].password)) {
            const token = jwt.encode({ username: formData.username }, secret);
            return { token: token };
        } else {
            return { err: "Password did not match" };
        }
    } else {
        // no user found
        return { err: "User with that username was not found" };
    }
}

module.exports = {createAccount, authenticate}