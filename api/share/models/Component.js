const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Brand = require('./Brand')
const Category = require('../models/Category')
const Unity = require('../models/Unity')
const Supplier = require('../models/Supplier')

const Component = database.define('Component', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING
    },
    sap: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
},
}, {
    timestamps: true,
    paranoid: true
});

Component.belongsTo(Brand, { constraint:true, foreignKey: 'brandId' });
Component.belongsTo(Category, { constraint:true, foreignKey: 'categoryId' });
Component.belongsTo(Unity, { constraint:true, foreignKey: 'unityId' });
Brand.hasMany(Component, { foreignKey: 'brandId' });
Category.hasMany(Component, { foreignKey: 'categoryId' });
Unity.hasMany(Component, { foreignKey: 'unityId' });
Component.belongsToMany(Supplier, { through: 'Component_Supplier' });
Supplier.belongsToMany(Component, { through: 'Component_Supplier' });

module.exports = Component;