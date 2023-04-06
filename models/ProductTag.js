// This is the ProductTag model. It will be used to create the product_tag table in the database.
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns for ProductTag model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  product_id: {
      type: DataTypes.INTEGER,
      references: {
          model: "product",
          key: "id"
      }
  },
  tag_id: {
      type: DataTypes.INTEGER,
      references: {
          model: "tag",
          key: "id"
      }
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// Export the ProductTag model for use in other files
module.exports = ProductTag;
