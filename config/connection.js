// require dotenv to hide sensitive information
require('dotenv').config();

// require sequelize
const Sequelize = require('sequelize');


// create connection to our database, pass in your MySQL information for username and password
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
      decimalNumbers: true,
      },
    });

// export connection for use in our Sequelize models
module.exports = sequelize;
