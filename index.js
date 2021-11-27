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

    res.json(
        await Usuario.findAll()
    ).status(200);

})

// Read for Services
app.get('/services/', async (req, res) => {

    await database.sync();

    res.json(
        await Servico.findAll()
    ).status(200);

})

// Create Service
app.post('/servicos/', async (req, res) => {

    await database.sync()

    const { produto, data_entrada,
        data_saida, descricao,
        preco_peca, preco_mobra } = await req.body;

    const newService = new Servico(req.body);

    newService.save(req.body)

    res.json(req.body).status(201)
})

// Create User
app.post('/usuarios/', async (req, res) => {

    await database.sync();

    const { nome, email, senha, id_servico } = await req.body;

    const newUser = new Usuario(req.body)

    // if (email != null && senha != null && nome != null) {
    newUser.save(req.body)
        .then((result) => {
            res.json(result)
        }).catch((error) => {
            console.log(error)
        })
    return res.status(201, 'Created').json(req.body)
    // } else {
    //     return res.status(400, 'Bad request')
    // }
})

var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)