const Users = require('../data/model');
const bcrypt = require('bcryptjs');

const restrict = (req, res, next) => {
    const { username, password } = req.headers;

    if(username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'You Shall Not PASS' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'YOU SHALL NOT PASS' })
            })
    } else {
        res.status(400).json({ message: 'you shall not pass' })
    }
}

module.exports = {
    restrict
}