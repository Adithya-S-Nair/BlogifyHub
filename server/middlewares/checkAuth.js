const jwt = require('jsonwebtoken');
require("dotenv").config();

const checkAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized: Missing token' });
        }
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized: Invalid Token' });
            }
            req.userId = userData.userId
            req.username = userData.username
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = checkAuth;