const db = require("../db")
const Favorites = db.favorites;
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
        let favoritesData = await Favorites.findAll({
            where: {
                client_id: req.userId
            }
        });

        for (let i = 0; i < favoritesData.length; i++) {
            favoritesData[i].dataValues["plantData"] = await Plants.findByPk(favoritesData[i].plantId);
        }

        res.send(favoritesData);

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

    try {
        let existed = await Favorites.findAll({
           where: {
               clientId: req.userId,
               plantId: req.body.plantId
           }
        });

        console.log(existed.length)
        if (existed.length > 0) {
            res.status(400).send({
                message: "Plant already is favorites"
            });
            return;
        }

        let data = await Favorites.create({
            clientId: req.userId,
            plantId: req.body.plantId
        });

        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}


// DELETE
exports.delete = async (req, res) => {
    if (parseInt(req.params.userId) !== req.userId) {
        res.status(403).send({
            message: "You are trying to access resources you have no authorization for."
        });
        return;
    }

    try {
        let data = await Favorites.destroy({
            where: {
                clientId: req.userId,
                plantId: req.params.plantId
            }
        });
        if (data === 1) {
            res.send("Deleted from favorites successfully");
            return;
        }

        res.send("Deletion failed");
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while loading"
        });
    }
}