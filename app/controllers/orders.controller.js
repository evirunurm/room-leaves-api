const db = require("../db")
const Orders = db.orders;
const OrderDetails = db.orderDetails;
const Plants = db.plants;

// GET
// Find all orders for user
exports.findAll = async (req, res) => {
    if ( parseInt(req.params.userId) !== req.userId ) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let ordersData = await Orders.findAll({
            where: {
                client_id: req.userId
            }
        });

        for (let i = 0; i < ordersData.length; i++) {
            ordersData[i].dataValues["details"] = await OrderDetails.findAll({
                where: {
                    orderId : ordersData[i].id
                }
            });
            // Get plant data for each Order Detail, so it doesn't have to be fetched again.
            for (let j = 0; j < ordersData[i].dataValues["details"].length; j++) {
                ordersData[i].dataValues.details[j].dataValues["plantData"] = await Plants.findByPk(ordersData[i].dataValues.details[j].dataValues.plantId);
            }
        }

        res.send(ordersData);

    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}

// PUT
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

// POST
exports.create = async (req, res) => {
    if (parseInt(req.params.userId) !== req.userId) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    if (!req.userId) {
        res.status(400).send({
            message: "You must be identified in order to perform this action."
        });
        return;
    }

    let details = req.body.details;
    if (details === [] || !details) {
         res.status(400).send({
            message: "You must include details about the order."
        });
        return;
    }

    try {
        let orderDetail, plant, price;
        let totalPrice = 0;

        for (let i = 0; i < details.length; i++) {
            plant = await Plants.findByPk(details[i].plantId);
            price = plant.dataValues.price;
            totalPrice += price * details[i].amount;
        }

        let order = {
            clientId: req.userId,
            total: totalPrice,
            shippingMethod: req.body.shippingMethod,
            billingAddress: req.body.billingAddress,
            paymentMethod: req.body.paymentMethod,
        }

        let data = await Orders.create(order);
        let orderId = data.dataValues.id;

        for (let i = 0; i < details.length; i++) {
            plant = await Plants.findByPk(details[i].plantId);
            price = plant.dataValues.price;

            orderDetail = await OrderDetails.create({
                ...details[i],
                orderId: orderId,
                price: (price * details[i].amount)
            });
            /* Subtracts from stock */
            plant.stock = plant.stock - details[i].amount;
            await plant.save();
        }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}