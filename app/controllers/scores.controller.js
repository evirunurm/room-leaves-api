const db = require("../db");
const Scores = db.scores;

exports.create = async (req, res) => {
	if ( !req.userId ) {
         res.status(401).send({
            message: "You must be logged in"
         });
         return;
    }

    try {
		let data = Scores.create({
			value: req.body.value,
			message: req.body.message ? req.body.message : null,
			plantId: req.body.plantId,
			clientId: req.userId
		});

        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while setting a score"
        });
    }
}

exports.update = async (req, res) => {
	if ( !req.userId ) {
         res.status(401).send({
            message: "You must be logged in"
         });
         return;
    }

	if (!req.params.id) {
		res.status(400).send({
            message: "You mus provide an id"
         });
         return;
	}

    try {
		let data = await Scores.update(req.body, {
            where: {
                id: req.params.id
            }
        });

		if (data[0] === 1) {
			res.send({
				message: "Score updated"
			});
		} else {
			res.send({
				message: "Couldn't update the score."
			});
        }
        // res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error has occurred while updating the score"
        });
    }
}