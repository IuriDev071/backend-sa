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

// Read Users
app.get('/users/', async (req, res) => {

    await database.sync();

    res.json(await Usuario.findAll()).status(200);

})

// Read Services
app.get('/services/', async (req, res) => {

    await database.sync();

    res.json(await Servico.findAll()).status(200);

})

// Create Service
app.post('/servicos/', async (req, res) => {
    await database.sync();

    const { produto, data_entrada,
        data_saida, descricao,
        preco_peca, preco_mobra } = req.body;

    const novoServico = await Servico.create({
        produto: req.body.produto,
        data_entrada: req.body.data_entrada,
        data_saida: req.body.data_saida,
        descricao: req.body.descricao,
        preco_peca: req.body.preco_peca,
        preco_mobra: req.body.preco_mobra
    })

    novoServico.save(req.body)

    res.json(req.body).status(201)
})

// Create User
app.post('/usuarios/', async (req, res) => {
    await database.sync();

    const { nome, email, senha } = req.body;

    const novoUsuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        id_servico: req.body.id_servico
    })

    novoUsuario.save(req.body)

    res.json(req.body).status(201)
})

var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)