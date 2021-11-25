const express = require('express')
const cors = require('cors')
const database = require('./connect')
const Usuario = require('./models/usuario')
const Servico = require('./models/servico')

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

// Fazer um get ALL aqui
// app.get('/', (req, res) => {
//     res.json()
// })

// Create User
app.post('/usuarios/', async (req, res) => {

    // Tirar o {force: true} depois dos testes;
    await database.sync({ force: true });

    const novoUsuario = await Usuario.create({
        nome: 'Cardoso',
        email: 'amon.ra@gmail.com',
        senha: 'oby123456',
    })

    res.json(novoUsuario).status(201)

    // Não mexe aqui ;)
    // Validando cadastro do Usuario
    // if (novoUsuario == usuarioCadastrado) {
    //     res.json('Cadastro já existe').status(400)
    // } else {
    //     res.json(novoUsuario)
    // }
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
        // valor_total: preco_mobra + preco_peca,
        id: novoUsuario.id
    })

    res.json(novoServico).status(201)
})
var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)