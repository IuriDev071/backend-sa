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

    res.json(await Usuario.findOne()).status(200);

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

    try {
        if (produto != null && data_entrada != null
            && data_saida != null && preco_mobra != null) {
            const novoServico = await Servico.create({
                produto,
                data_entrada,
                data_saida,
                descricao,
                preco_peca,
                preco_mobra
            })

            novoServico.save(req.body)

            res.json(req.body).status(201)
        } else {
            res.json(error).status(400)
        }
    } catch (error) {
        console.log(error)
    }
})

// Create User
app.post('/usuarios/', async (req, res) => {
    await database.sync();

    const { nome, email, senha } = req.body;

    try {
        if (email != null && nome != null && senha != null) {
            const novoUsuario = await Usuario.create({
                nome,
                email,
                senha
            })

            novoUsuario.save(req.body)

            res.json(req.body).status(201)
        } else {
            res.json(error).status(400)
        }
    } catch (error) {
        console.log(error)
    }
})

// POST de Login
app.post('/usuarios/login', async (req, res) => {
    await database.sync();

    let estaLogado = 0;

    const { email, senha } = req.body;

    try {

        const user = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            estaLogado = 0;
            res.json("Usuário não encontrado").status(404)
            console.log(estaLogado)
        } else {
            estaLogado = 1;
            res.json("Logado com sucesso").status(202)
            console.log(estaLogado)
        }
    } catch (error) {
        console.log(error)
    }
})

var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)