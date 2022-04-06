const db = require("../db");
const Users = db.users;
let session;
// GET
exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

// POST
exports.login = async (req, res) => {

}

exports.signup = async (req, res) => {

}

// PUT
exports.update = async (req, res) => {

}

// DELETE
exports.delete = async (req, res) => {
    if (req.session.user) {

    } else {

    }
}