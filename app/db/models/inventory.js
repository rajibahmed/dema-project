'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(order) {
      this.hasMany(order, { foreignKey: 'productId' });
    }
  }
  Inventory.init(
    {
      productId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      category: DataTypes.STRING,
      subCategory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Inventory',
    }
  );

  return Inventory;
};
