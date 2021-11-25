const Sequelize = require('sequelize')
const database = require('../connect')
const Usuario = require('./usuario')

const Servico = database.define('servico', {
    id_servico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    produto: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    data_entrada: {
        type: Sequelize.DATE,
        allowNull: false,
        isNumeric: true
    },
    data_saida: {
        type: Sequelize.DATE,
        allowNull: false,
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
        allowNull: false,
        isNumeric: true
    },
    valor_total: {
        type: Sequelize.DECIMAL,
        value: SUM(preco_mobra + preco_peca)
    }
})

Servico.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'id'
})

module.exports = Servico;