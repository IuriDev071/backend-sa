const Sequelize = require('sequelize')
const database = require('../connect')

const Servico = database.define('servico', {
    id_servico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'usuarios',
            foreignKey: 'id',
            constraints: true
        },
    },
    produto: Sequelize.STRING,
    data_entrada: Sequelize.DATE,
    data_saida: Sequelize.DATE,
    descricao: Sequelize.STRING,
    preco_peca: Sequelize.FLOAT,
    preco_mobra: Sequelize.FLOAT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Servico;