const Sequelize = require('sequelize')

const database = new Sequelize('bc_bsd', 'root', 'oby123456', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = database;