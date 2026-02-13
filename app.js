'use strict';
// Initilisation
const express = require('express');
const mylog = require('./log');

process.on('uncaughtException', (err) => {
  mylog.log('Uncaught exception, oh no! 👻 Shutting down...');
  mylog.log(`${err.name}, ${err.message}`);

  process.exit(1);
});

const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitise = require('express-mongo-sanitize');
const deepSanitize = require('./utils/sanitizer');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

process.loadEnvFile('./config.env');

const dataRouter = require('./routes/dataRoute');
const userRouter = require('./routes/userRoute');
const AppError = require('./utils/AppError');
const globErrHandler = require('./controllers/errorController');

// Mongoose
const DB = process.env.MONGO_DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.MONGO_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  const date = new Date().toLocaleString('en-ZA');
  mylog.log(`MongoDB connection succesful! At ${date.split(', ')[1]}`);
});

// Global Middleware
app.use(helmet());

// Source - https://stackoverflow.com/a/79668053
// Posted by Mohammed Sersawy, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-11, License - CC BY-SA 4.0

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    ...Object.getOwnPropertyDescriptor(req, 'query'),
    value: req.query,
    writable: true,
  });
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString('en-ZA');
  mylog.log('////////////////' + req.requestTime.split(', ')[1]);
  next();
});

const morganLogStream = fs.createWriteStream(path.join('./log', 'access.log'), {
  flags: 'a',
});
if (process.env.NODE_ENV === 'development')
  app.use(morgan('combined', { stream: morganLogStream }));

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again later.',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitise());

app.use((req, res, next) => {
  deepSanitize(req.body);
  next();
});

// Routers
app.use('/api/v1/data', dataRouter);
app.use('/api/v1/users', userRouter);

// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, '127.0.0.1', () => {
  //const time = new Date().toISOString();
  const date = new Date().toLocaleString('en-ZA');
  mylog.log(`App is running on port ${port}, at ${date}`);
});

//Error handling
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globErrHandler);

process.on('unhandledRejection', (err) => {
  mylog.log(`${err.name}, ${err.message}`);
  mylog.log('Unhandled rejection, oh no! 👻 Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
