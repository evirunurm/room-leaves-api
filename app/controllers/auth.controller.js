const db = require("../db");
const config = require("../auth/auth.config");
const Users = db.users;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const DAY = 1000 * 60 * 60 * 24;


// GET
exports.logout = async (req, res) => {

}

// POST
exports.login = async (req, res) => {
    // Log in to the site

    try {
        let user = await Users.findOne({
            email: req.body.email,
        });

        // Filter non existent user
        if (!user) {
            return res.status(404).send({
                message: "User with email " + req.body.email + " not found."
            });
        }

        let validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // Filter invalid password
        if (!validPassword) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        let token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: DAY }
        );

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "An unrecognized error has occurred."
        });
    }
}

exports.signup = async (req, res) => {
    // Save User to Database
    if ( !req.body.fullname || !req.body.email || !req.body.password ) {
         res.status(400).send({
            message: "You must include all required fields"
        });
        return;
    }

    try {
        let user = await Users.create({
            full_name: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        });
        res.send("Your profile was created successfully.");
    } catch (err) {
         res.status(500).send({
            message: err.message || "An error has occurred while creating user with email " + req.body.email
        });
    }
}

// PUT
exports.update = async (req, res) => {

}

// DELETE
exports.delete = async (req, res) => {

}