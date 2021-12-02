const Sequelize = require('sequelize')

const database = new Sequelize('heroku_69a6f03e280d282', 'b4247e74a59e5f', 'd9304ddf', {
    dialect: 'mysql',
    host: 'us-cdbr-east-04.cleardb.com',
})

module.exports = database;