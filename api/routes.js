const express = require('express');
const router = express.Router();

const Users = require('../data/model');

const bcrypt = require('bcryptjs');
const mw = require('./middleware');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
            .then(success => {
                delete success.password;

                res.status(201).json(success);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `${username} logged in` });
            } else {
                res.status(401).json({ message: "You Shall NOT Pass" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: "You SHALL Not Pass" })
        });
})

router.get('/users', mw.restrict, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err: err, message: "YOU Shall Not Pass"})
        })
})

module.exports = router;