
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Pet extends Model { }

Pet.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    animal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Pet'
});

module.exports = Pet;
