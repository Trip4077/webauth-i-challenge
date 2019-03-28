const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development);
const Users = require('../data/model');

const bcrypt = require('bcryptjs');


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

router.get('/users', (req, res) => {
    res.send('users');
})

module.exports = router;