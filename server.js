const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const server = express();

server.use(express.json(), helmet(), cors(), logger('dev'));

module.exports = server;
