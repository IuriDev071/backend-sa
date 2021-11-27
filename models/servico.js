const Sequelize = require('sequelize')
const database = require('../connect')
const Usuario = require('./usuario')

const Servico = database.define('servico', {
    id_servico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id',
            constraint: true
        }
    },
    produto: Sequelize.INTEGER,
    data_entrada: Sequelize.DATE,
    data_saida: Sequelize.DATE,
    descricao: Sequelize.INTEGER,
    preco_peca: {
        type: Sequelize.DECIMAL,
        defaultValue: '0',
    },
    preco_mobra: Sequelize.DECIMAL,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Servico;