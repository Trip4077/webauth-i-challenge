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
    res.send('login');
})

router.get('/users', (req, res) => {
    res.send('users');
})

module.exports = router;