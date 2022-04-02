const db = require("../db");
const Plants = db.plants;
const Operators = db.Sequelize.Op;

// GET
exports.findAll = async (req, res) => {
    let where, query = {};
    let order = [];

    // Filter with "order"
    if (req.params.ordertype || req.params.orderattr) {
        let ordertype = req.params.ordertype;
        let ordertypeArr = ordertype.split(",");
        ordertypeArr.forEach(type => {
            order.push([type, req.params.orderattr ? req.params.orderattr : 'DESC'])
        });
        query.order = order;
    }

    // Filter with "where"
    if (req.params.id) {
        where.id = req.params.id;
        query.where = where;
    }

    // TODO: Get "recent" with timestamps

    try {
        let data = await Plants.findAll(query);
        res.send(data);
    } catch (err) {
        res.code(500).send({
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
        res.code(500).send({
            message: err.message || "An error has occurred with plant " + id
        });
    }
}

// POST
exports.create = async (req, res) => {
    // Validate req params.
    if ( !req.params.stock || !req.params.name || !req.params.price || !req.params.height ) {
        res.send(400).send({
            message: "There are some parameters left without passing"
        });
        return;
    }

    let plant = {}
    let id = req.params.id;

    // Includes:
    // stock NN, description, name NN, price NN, humidity, temperature, height NN
    for (const param in req.params) {
         plant[param] = req.params[param];
    }

    try {
        let data = await Plants.create(plant);
        res.send(data);
    } catch (err) {
        res.code(500).send({
            message: err.message || "An error has occurred while creating plant " + id
        });
    }
}


// PUT
exports.update = async (req, res) => {
    if ( !req.params.id ) {
         res.send(400).send({
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

        if (data == 1) {
            res.send({
                message: "Plant updated"
            });
        } else {
            res.send({
                message: "Coulnd't update. Maybe plant wasn't found"
            });
        }

    } catch (err) {
        res.code(500).send({
            message: err.message || "An error has occurred while updating plant " + id
        });
    }
}

// DELETE
exports.deleteAll = async (req, res) => {
    try {
        Plants.destroy({
            where: {},
            truncate: false
        });
    } catch (err) {
        res.code(500).send({
            message: err.message || "An error has occurred while deleting all plants"
        });
    }
}

exports.delete = async (req, res) => {
    let id =  req.params.id;

    try {
        Plants.destroy({
            where: {
                id: id
            },
            truncate: false
        });
    } catch (err) {
        res.code(500).send({
            message: err.message || "An error has occurred while deleting plant " + id
        });
    }
}