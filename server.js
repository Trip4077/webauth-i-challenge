const express = require('express');

const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const sessionStore = require('connect-session-knex')(session);

const server = express();
const routes = require('./api/routes');

const sessionConfig = {
    name: '_config1701',
    secret: '*_*4-0-7-7*_*',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,

    store:  new sessionStore({
                    knex:  require('./data/dbConfig'),
                    tablename: 'sessions',
                    sidfieldname: 'sid',
                    createtable: true,
                    clearInterval: 1000 * 60 * 60 * 20
                }),
}

server.use(session(sessionConfig));
server.use(express.json(), helmet(), cors(), logger('dev'));

server.use('/api', routes);

module.exports = server;
