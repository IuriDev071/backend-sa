(async () => {
    const Usuario = require('./Models/usuario')
    const Servico = require('./Models/servico')
    const database = require('./connect')

    await database.sync();

    const novoServico = await Servico.create({
        produto: 'Macbook Pro',
        data_entrada: '2021-07-29',
        data_saida: '2021/07/31',
        descricao: 'Problema no SSD',
        preco_mobra: '780',
        preco_peca: '230',
    })

    const novoUsuario = await Usuario.create({
        nome: 'Matiello',
        email: 'matiello@gmail.com',
        senha: 'oby123456',
        id_servico: novoServico.id_servico
    })

    console.log(novoUsuario)
})();


// Funcionando o Foreign Key graças a Deus;