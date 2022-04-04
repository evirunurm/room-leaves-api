const db = require("../db")
const Users = db.users;
const Operators = db.Sequelize.Op;

// GET
exports.findAll = async (req, res) => {
    try {
        let data = await Users.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    const email = req.params.email;

    try {
        let data
        if (id) {
            data = await Users.findByPk(id)
        } else if (email) {
            data = await Users.findOne({
                where: {
                    email: email
                }
            })
        }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred with user " + id
        });
    }
}

// POST
exports.create = async (req, res) => {
    if ( !req.body.fullname || !req.body.email || !req.body.password ) {
         res.status(400).send({
            message: "You must include all required fields"
        });
        return;
    }

    const user = {
        full_name: req.body.fullname,
        address: req.body.email,
        email: req.body.password ? req.body.password : null,
        password: req.body.password
    }

    try {
        let data = await Users.create(user);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while creating user with email " + req.body.email
        });
    }
}

exports.update = async (req, res) => {
    // TODO: Has to be logged in
    if ( !req.params.id || !req.params.email ) {
         res.status(400).send({
            message: "You must pass an id or email"
        });
         return;
    }
    const where = {};
    const id = req.params.id;
    const email = req.params.email;

    if (id) {
        where.id = id;
    } else {
         where.email = email;
    }

    try {
        let data = await Users.update(req.body, {
            where: where
        });
        if (data === 1) {
            res.send({
                message: "User updated"
            });
        } else {
            res.send({
                message: "Couldn't update. Maybe user wasn't found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while updating user " + (id || email)
        });
    }


}

exports.login = async (req, res) => {


}

// DELETE
exports.deleteAll = async (req, res) => {
     try {
        let data = await Users.destroy({
            where: {},
            truncate: false
        });
        res.send( data + " users deleted successfully" );
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while deleting users"
        });
    }

}

exports.delete = async (req, res) => {
    // TODO: Has to be logged in
    let id =  req.params.id;

    try {
        let data = await Users.destroy({
            where: {
                id: id
            },
            truncate: false
        });
        if (data === 1) {
            res.send({
                message: "User deletes successfully"
            });
        } else {
            res.send({
                message: "Coulnd't delte. Maybe user wasn't found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while deleting user " + id
        });
    }

}