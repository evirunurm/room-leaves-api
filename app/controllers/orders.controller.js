const db = require("../db")
const Orders = db.orders;
const OrderDetails = db.orderDetails;

// GET / POST
// Find all orders for user
exports.findAll = async (req, res) => {
    if ( parseInt(req.params.userId) !== req.userId ) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let dataOrder = await Orders.findAll({
            where: {
                client_id: req.userId
            }
        });
        let dataOrderDetails = await OrderDetails.findAll({
            where: {
                client_id: req.userId
            }
        });

        res.send(dataOrder);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}

/*exports.findOne = async (req, res) => {
    if (parseInt(req.params.userId) !== req.userId) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let data = await Orders.findByPk(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}*/

exports.update = async (req, res) => {
    if (parseInt(req.params.userId) !== req.userId) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }


    try {
        let data = await Orders.findAll({
            where: {
                client_id: req.userId
            }
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}

exports.create = async (req, res) => {
/*    if (parseInt(req.params.userId) !== req.userId) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }*/

    // TODO: filter body content to include everything I need for an order (at least one plant...)
/*    if (res) {

    }*/


    try {
        let data = await Orders.create({
            where: {
                client_id: req.userId
            }
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}