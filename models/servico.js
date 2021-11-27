const Sequelize = require('sequelize')
const database = require('../connect')
const Usuario = require('./usuario')

const Servico = database.define('servico', {
    id_servico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    produto: {
        type: Sequelize.TEXT,
    },
    data_entrada: {
        type: Sequelize.DATE,
        isNumeric: true
    },
    data_saida: {
        type: Sequelize.DATE,
        isNumeric: true
    },
    descricao: Sequelize.STRING,
    preco_peca: {
        type: Sequelize.DECIMAL,
        defaultValue: '0',
        isNumeric: true
    },
    preco_mobra: {
        type: Sequelize.DECIMAL,
        isNumeric: true
    },
    // valor_total: {
    //     type: Sequelize.DECIMAL,
    //     // value: SUM(preco_mobra + preco_peca)
    // },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    }
})

module.exports = Servico;