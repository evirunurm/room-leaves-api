const jwt = require("jsonwebtoken");
const config = require("../auth/auth.config");


verifyToken = (req, res, next) => {
    let token;
    const autHeader = req.headers["Authorization"];

    if (!autHeader) {
        return res.status(403).send({
          message: "No token provided"
        });
    }

    if (autHeader.startsWith("Bearer ")) {
        token = autHeader.substring(7, autHeader.length);
    } else {
        res.status(401).send({
            message: "Authentication failed. Check that the Authorization header follows the Bearer schema."
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt;