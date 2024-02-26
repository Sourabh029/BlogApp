
const { verifyToken } = require('../services/auth');

function checkCookie(cookiename) {
    return (req, res, next) => {
        const token = req.cookies[cookiename];
        console.log(token);
        if (!token) return next();
        try {
            const user = verifyToken(token);
            console.log(user._id);
            req.user = user;
            return next();
        }
        catch (err) {

        }
        return next();
    }
}


module.exports = checkCookie;