const Sequelize = require('sequelize')
const database = require('../connect')

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: {
        type: Sequelize.STRING,
        min: 6,
        max: 16
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Usuario;