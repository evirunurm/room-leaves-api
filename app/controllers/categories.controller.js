const db = require("../db");
const Categories = db.categories;

// GET
exports.findAll = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.send(categories);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred."
        });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await Categories.findByPk(id);
        if (category) {
            res.send(category);
        } else {
            res.status(404).send({
                message: `No category with id ${ id } found`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while retrieving category " + id
        });
    }
}

// POST
exports.create = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Cannot create a category without name"
        });
        return;
    }

    const category = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null
    }
    if (category.description === null) delete category.description;

    try {
        let data = await Categories.create(category);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while creating category."
        })
    }
}

// PUT
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        let data = await Categories.update(req.body, {
            where: {
                id: id
            }
        });
        if (data == 1) {
            res.send({
                message: "Category updated"
            });
        } else {
            res.send({
                message: "Coulnd't update. Maybe category wasn't found"
            });
        }
    } catch (err) {
        req.status(500).send({
            message: err.message || "Error occurred while updating category"
        })
    }
}

exports.deleteAll = async (req, res) => {
    Categories.destroy({
        where: {},
        truncate: false
    })
}


















