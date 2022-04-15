const db = require("../db");
const Plants = db.plants;
const Operators = db.Sequelize.Op;

// GET
exports.findAll = async (req, res) => {
    try {
        let data = await Plants.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        let data = await Plants.findByPk(id)
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred with plant " + id
        });
    }
}

// POST
exports.create = async (req, res) => {
    // Validate req body.
    if ( !req.body.stock || !req.body.name || !req.body.price || !req.body.height ) {
        res.status(400).send({
            message: "There are some parameters left without passing"
        });
        return;
    }

    let plant = {}

    // Includes:
    // stock NN, description, name NN, price NN, humidity, temperature, height NN
    for (const param in req.body) {
        if (param == "height" || param == "price") {
            plant[param] = parseFloat(req.body[param]);
            continue;
        }
         plant[param] = req.body[param];
    }

    try {
        let data = await Plants.create(plant);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while creating plant " + id
        });
    }
}


// PUT
exports.update = async (req, res) => {
    if ( !req.params.id ) {
         res.status(400).send({
            message: "You must pass an id"
        });
         return;
    }
    let id = req.params.id;

    try {
        let data = await Plants.update(req.body, {
            where: {
                id : id
            }
        });
        if (data === 1) {
            res.send({
                message: "Plant updated"
            });
        } else {
            res.send({
                message: "Coulnd't update. Maybe plant wasn't found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while updating plant " + id
        });
    }
}

// DELETE
exports.deleteAll = async (req, res) => {

   try {
        let data = await Plants.destroy({
            where: {},
            truncate: false
        });
        res.send( data + " plants deleted successfully" );
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while deleting plants"
        });
    }
}

exports.delete = async (req, res) => {
    let id =  req.params.id;

    try {
        let data = await Plants.destroy({
            where: {
                id: id
            },
            truncate: false
        });
        if (data === 1) {
            res.send({
                message: "Plant deletes successfully"
            });
        } else {
            res.send({
                message: "Coulnd't delte. Maybe plant wasn't found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while deleting plant " + id
        });
    }
}