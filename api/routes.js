const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.post('/register', (req, res) => {
    res.send('register');
})

router.post('/login', (req, res) => {
    res.send('login');
})

router.get('/users', (req, res) => {
    res.send('users');
})

module.exports = router;