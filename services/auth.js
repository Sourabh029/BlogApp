const jwt = require('jsonwebtoken');
const secret = "sec";


const createToken = (user) => {
    let payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        profileurl: user.profileurl


    };
    let token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;
}

const verifyToken = (token) => {
    let user = jwt.verify(token, secret);

    return user;
}


module.exports = { createToken, verifyToken }