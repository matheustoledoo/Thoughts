const flash = require('express-flash')
const User = require('../models/User.js')

// package para incriptar a senha do usuario para nao salvar-la crua
const bcrypt = require('bcryptjs')
const { where } = require('sequelize')

module.exports = class AuthController {

    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res) {
      const { email, password } = req.body
  
      // find user
      const user = await User.findOne({ where: { email: email } })
  
      if (!user) {
        res.render('auth/login', {
          message: 'Usuário não encontrado!',
        })
  
        return
      }

      // check if passwords match
      const passwordMatch = bcrypt.compareSync(password, user.password)

      if(!passwordMatch){
        res.render('auth/login', {
          message: 'Senha invalida',
        })

        return
      }

      // auth user
      req.session.userid = user.id

      req.flash('message', 'Login realizado com sucesso!')

      req.session.save(() => {
         res.redirect('/')
      })

    }


    static register(req, res){
        res.render('auth/register')
    }


    static async registerPost(req, res) {

        const { name, email, password, confirmpassword } = req.body

        // passwords match validation
        if (password != confirmpassword) {
          req.flash('message', 'As senhas não conferem, tente novamente!')
          res.render('auth/register')
    
          return
        }
    
        // email validation
        const checkIfUserExists = await User.findOne({ where: { email: email } })
    
        if (checkIfUserExists) {
          req.flash('message', 'O e-mail já está em uso!')
          res.render('auth/register')
    
          return
        }
    
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
    
        const user = {
          name,
          email,
          password: hashedPassword,
        }
    
        User.create(user)
          .then((user) => {
            // initialize session
            req.session.userid = user.id
    
            console.log('salvou dado')
            console.log(req.session.userid)
    
            req.session.userid = user.id
    
            req.flash('message', 'Cadastro realizado com sucesso!')
    
            req.session.save(() => {
              res.redirect('/')
            })
          })
          .catch((err) => console.log(err))
      }

    
      static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
      }
    }