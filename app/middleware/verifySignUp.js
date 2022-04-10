const db = require("../db");
const User = db.users;

checkDuplicateEmail = async (req, res, next) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        res.status(400).send({
            message: "Email already is use"
        });
        return;
    }
    next();
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp;
