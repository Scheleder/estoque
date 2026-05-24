const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Supplier = require('../models/Supplier')

const Contact = database.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
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

Contact.belongsTo(Supplier, { constraint:true, foreignKey: 'supplierId' });
Supplier.hasMany(Contact, { foreignKey: 'supplierId' });

module.exports = Contact;