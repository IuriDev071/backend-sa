const express = require('express')
const cors = require('cors')
const database = require('./connect')
const Usuario = require('./Models/usuario')
const Servico = require('./Models/servico')

const PORT = process.env.NODE_ENV || 3005;

// const config = require('./config.json')[env];

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

    res.json('Sequelize rodando').status(200)

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
                email,
                nome,
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
                email: email,
                senha: senha
            }
        })

        if (!user) {
            estaLogado = 0;
            res.json("Usuário não encontrado").status(404)
        } else {
            estaLogado = 1;
            let obj = {};
            const data = await Usuario.findOne({
                where: {
                    email: email
                }
            })
            obj = {
                flag: estaLogado,
                data
            }
            res.json(obj).status(200)
        }
    } catch (error) {
        console.log(error)
    }
})

// Update User
app.put('/usuarios/update', async (req, res) => {
    await database.sync();

    const { nome, id } = req.body;

    try {

            await Usuario.findOne({
                where: {
                    id: id
                }
            }).then((Usuario) => {
                if (Usuario) {
                    Usuario.update({
                        nome: nome
                    })
                }
            })

                res.json("Atualizado Ok").status(200);

    } catch (error) {
        console.log(error)
        res.json("Erro").status(401)
    }
})

//Delete user
app.delete('/usuarios/delete', async (req, res) => {
    await database.sync()
 
    const {id} = req.body;

    try {
        
        await Usuario.destroy({
            where: {
                  id: id
             }
         });
     
        res.json("Exclude ok").status(201);
    } catch (error) {
        console.log(error)
        res.json("Erro").status(401)
    }
});
    
var http = require('http')

var server = http.createServer(app)
server.listen(PORT)
console.log("Rodando na porta: " + PORT)