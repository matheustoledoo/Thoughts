
// criamos isso para barrar os usuarios que tentem acessar rotas como a dashboard sem estar logado

module.exports.checkAuth = function(req, res, next) {
    const userId = req.session.userId

    if(!userId){
        res.redirect('/login')
    }

    next()
}