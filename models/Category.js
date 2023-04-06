// Model and DataTypes will be imported from the sequelize package
const { Model, DataTypes } = require('sequelize');

// Import connection to the database (connection.js)
const sequelize = require('../config/connection.js');

// Initialize Category model (table) by extending off Sequelize's Model class
class Category extends Model {}

Category.init(
    {
      // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define category name column
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // pass in imported sequelize connection (the direct connection to our database)
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category',
    }
);

// Export the Category model for use in other files
module.exports = Category;
