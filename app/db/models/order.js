'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(inventory) {
      // define association here
      this.belongsTo(inventory, { foreignKey: 'productId' });
    }
  }
  Order.init(
    {
      orderId: DataTypes.STRING,
      productId: {
        type: DataTypes.STRING,
        references: {
          model: 'Inventories',
          key: 'productId',
        },
      },
      currency: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      shippingCost: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      channel: DataTypes.STRING,
      channelGroup: DataTypes.STRING,
      campaign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
