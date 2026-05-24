const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Supplier = database.define('Supplier', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    adress: {
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


module.exports = Supplier;