const { verify } = require("jsonwebtoken")
const secret = '(*&^%$#@!)'

module.exports = {
    auth: (req, res, next) => {
        let token = req.get("authorization")

        if (token) {

            let wow = token.slice(7)

            verify(wow, secret, (err, decode) => {
                if (err) {
                    res.json({
                        message: "Login first",
                        err
                    })
                } else {
                    // let user = decode.result
                    console.log();
                    next()
                }
            })
        } else {
            res.json({
                message: "Access denied : unauthorized user"
            })
        }
    }
}