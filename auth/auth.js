const jwt = require("jsonwebtoken")
const secret = '(*&^%$#@!)'

module.exports = {
    auth: (req, res, next) => {
        let header = req.header.authorization
        let token = header && header.split("  ")[1]

        if (token == null) {
            res.status(404).json({
                message: "Unauthorized"
            })
        } else {
            jwt.verify(token, secret, (error, user) => {
                if (error) {
                    res.status(401).json({
                        message: "Invalid Token"
                    })
                } else {
                    console.log(user);
                    next()
                }
            })
        }
    }
}