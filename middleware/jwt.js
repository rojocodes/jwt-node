const jwt = require('jsonwebtoken');
let JWTOPTIONS = require('../JSON/token.json');
// use 'utf8' to get string instead of byte array  (512 bit key)
var Secret = Buffer.from(JWTOPTIONS.key, 'base64');

module.exports = {
    sign: (payload, $Options) => {
        // Token signing options
        var signOptions = {
            issuer: JWTOPTIONS.issuer,
            subject: JWTOPTIONS.subject,
            audience: JWTOPTIONS.audience,
            expiresIn: "30d", // 30 days validity
            algorithm: "HS256"
        };
        return jwt.sign(payload, Secret, signOptions);
    },
    verify: (req, res, next) => {

        // decode token
        if (req.headers['authorization']) {
            var token = req.headers['authorization'].split(' ')[1];
            //param1 and param2 are parameters you can use for authentication
            if (req.body.param1 == null || req.body.param2 == null) {
                return res.json({
                    status: "Failure",
                    msg: "VALIDATION_ERROR",
                    details: {
                        "error": "Incomplete Data - Appid or Mobile"
                    }
                });
            }
            var verifyOptions = {
                ignoreExpiration: false,
                algorithm: JWTOPTIONS.algorithm
            };
            try {
                jwt.verify(token, Secret, verifyOptions, function (err, decoded) {

                    if (err) {
                        if (err.name === 'TokenExpiredError')

                            return res.json({
                                status: "Failure",
                                msg: "TOKEN_EXPIRED",
                                details: {
                                    "error": "signin token expired"
                                }
                            });

                        else
                            return res.json({
                                status: "Failure",
                                msg: "TOKEN_ERROR",
                                details: {
                                    "error": "unable to parse token"
                                }
                            });
                    } else {
                        //fetch details from token and verify them
                        next();
                    }
                });
            } catch (err) {
                return res.json({
                    status: "Failure",
                    msg: "TOKEN_ERROR",
                    details: {
                        "error": "unable to parse token"
                    }
                });
            }
        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    },
    decode: (token) => {
        return jwt.decode(token, {
            complete: true
        });
        //returns null if token is invalid
    }
}