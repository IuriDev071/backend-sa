const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Yup = require("yup")
const User = require("../Mongo")

const ControllerLog = {
    async store(req,res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
          })
      
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ mensagem: 'Erro ao validar os campos' })
          }
      
          console.log(req.body)
          const { email, senha } = req.body
      
          const User = await User.findOne({ email })
      
          if (!User) {
            return res.status(401).json({ mensagem: 'Usuario nao encontrado' })
          }
      
          if (!(await User.comparePassword(senha))) {
            return res.status(401).json({ mensagem: 'senha nao confere' })
          }
    }
}

module.exports = ControllerLog;