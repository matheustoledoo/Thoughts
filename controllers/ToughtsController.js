const Tought = require('../models/Thought')
const User = require('../models/User')

module.exports = class ThoughtController {

    static async showThoughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId},
            // para trazer os pensamentos
            include: Tought,
            plain: true
        })

        // check if user exist
        if(!user){
            res.redirect('/login')
        }

        // aqui trazemos apenas os pensamentos atraves do map
        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createThought(req, res){
        res.render('toughts/create')
    }

    static async createThoughtSave(req, res){
        
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

       try {

        await Tought.create(tought)

        req.flash('message', 'Pensamento criado com sucesso!')
        

        req.session.save(() => {
            res.redirect('/')
        })

       } catch (error) {
            console.log(error)
       }
    }

    static async removeThought(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({where: {id: id, Userid: UserId}})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            throw error
        }
    }


}