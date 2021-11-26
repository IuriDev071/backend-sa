const Sequelize = require('sequelize')
const database = require('../connect')

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        isUppercase: true, 
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        isEmail: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        isUppercase: true, 
        type: Sequelize.STRING,
        allowNull: false,
        min: 6,
        max: 16
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    }
})

module.exports = Usuario;