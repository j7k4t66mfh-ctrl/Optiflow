'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const mylog = require('./log');
const logging =
  process.env.NODE_ENV === 'production' ? false : (...msg) => mylog.log(msg[0]); //mylog.log.bind(mylog);

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'mariadb',
    logging: logging,
  },
);

const Shipment = sequelize.define('shipment', {
  optimum_customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s]*$/i, //^[a-zA-Z\s]+$/i,
    },
  },
  routing: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s]*$/i,
    },
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUppercase: true,
    },
  },
  shipper: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s]*$/i,
    },
  },
  no_packages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
    },
  },
  gross_weight: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-Z0-9\s]*$/i,
      contains: 'kg',
    },
  },
  volumetric_weight: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-Z0-9\s]*$/i,
      contains: 'CBM',
    },
  },
  users: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize.sync({ alter: true }).then(() => {
  const date = new Date().toLocaleString('en-ZA');
  mylog.log(`MariaDB connection successful! At ${date.split(', ')[1]}`);
});

module.exports = Shipment;
