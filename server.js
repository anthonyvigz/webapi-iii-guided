const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();


// express.json is a method that returns a piece of middleware

server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.use(helmet());

server.use(clockout);

server.use(logger('dev'));

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function clockout(req, res, next) {
  const date = new Date();
  const seconds = date.getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ message: "You shall not pass" });
  } else {
    next();
  }
}

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`)
}

module.exports = server;
