const db = require("../db")
const Users = db.users;

// POST
exports.findOne = async (req, res) => {
    if ( !req.userId ) {
         res.status(401).send({
            message: "You must be logged in"
         });
         return;
    }
    if (req.userId !== parseInt(req.params.id)) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let data = await Users.findByPk(req.userId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "An error has occurred with user " + req.userId
        });
    }
}

// PUT
exports.update = async (req, res) => {
    // Has to be logged in
    if ( !req.userId ) {
         res.status(401).send({
            message: "You must be logged in"
        });
         return;
    }

    if (req.userId !== parseInt(req.params.id)) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let data = await Users.update(req.body, {
            where: {
                id: req.userId
            }
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
            message: "An error has occurred while updating user " + req.userId
        });
    }
}

// DELETE
exports.delete = async (req, res) => {
    // Has to be logged in
    if ( !req.userId ) {
         res.status(401).send({
            message: "You must be logged in"
        });
         return;
    }

     if (req.userId !== parseInt(req.params.id)) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let data = await Users.destroy({
            where: {
                id: req.userId
            },
            truncate: false
        });
        if (data === 1) {
            res.send({
                message: "User deleted successfully"
            });
        } else {
            res.send({
                message: "Couldn't delete."
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while deleting user " + req.userId
        });
    }
}


// TODO: Delete
// GET
/*exports.findAll = async (req, res) => {
    try {
        let data = await Users.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}*/

// POST
/*exports.create = async (req, res) => {
    if ( !req.body.fullname || !req.body.email || !req.body.password ) {
         res.status(400).send({
            message: "You must include all required fields"
        });
        return;
    }

    const user = {
        full_name: req.body.fullname,
        email: req.body.email,
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
}*/

/*exports.update = async (req, res) => {
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
}*/

// DELETE
/*exports.deleteAll = async (req, res) => {
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

}*/

/*
exports.delete = async (req, res) => {
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

}*/
