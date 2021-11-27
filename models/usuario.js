const Sequelize = require('sequelize')
const database = require('../connect')
const Servico = require('./servico')

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        isUppercase: true, 
        type: Sequelize.STRING,
    },
    email: {
        isEmail: true,
        type: Sequelize.STRING,
    },
    senha: {
        isUppercase: true, 
        type: Sequelize.STRING,
        min: 6,
        max: 16
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    }
})

Usuario.belongsTo(Servico, {
    constraint: true,
    foreignKey: 'id_servico'
})

module.exports = Usuario;