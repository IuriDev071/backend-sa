const express = require('express')
const cors = require('cors')
const database = require('./connect')
const Usuario = require('./Models/usuario')
const Servico = require('./Models/servico')

const PORT = process.env.PORT || 3005

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json('Sequelize rodando').status(200)
})

app.get('/users/', async (req, res) => {

    await database.sync();

    res.json(await Usuario.findAll())
    res.status(200);

})

// Read for Services
app.get('/services/', async (req, res) => {

    await database.sync();

    res.json(await Servico.findAll()).status(200);

})

// Create Service
app.post('/servicos/', async (req, res) => {

    await database.sync()

    const novoServico = await Servico.create({
        produto: 'Macbook Pro',
        data_entrada: '2021-07-29',
        data_saida: '2021/07/31',
        descricao: 'Problema no SSD',
        preco_mobra: '780',
        preco_peca: '230',
    })

    res.json(novoServico).status(201)
})

// Create User
app.post('/usuarios/', async (req, res) => {

    await database.sync();

    const novoUsuario = await Usuario.create({
        nome: 'Matiello',
        email: 'matiello@gmail.com',
        senha: 'oby123456',
        id_servico: novoServico.id_servico
    })

    res.json(novoUsuario).status(201)
})

var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)