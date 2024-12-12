const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Brand = require('./brand');

const Model = sequelize.define('Model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  average_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id',
    },
  },
}, {
  tableName: 'Models',
  timestamps: false,
});

Model.belongsTo(Brand, { foreignKey: 'brand_id' });
Brand.hasMany(Model, { foreignKey: 'brand_id' });

module.exports = Model;
