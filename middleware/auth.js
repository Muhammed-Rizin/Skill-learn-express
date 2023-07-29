const jwt = require('jsonwebtoken')
const verify = (req, res, next) => {
    const { headers } = req;


    const authHeader = headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized by me' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secret');

        req.body.userid = decoded._id

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized by you' });
    }
    next();
}


module.exports = {verify}