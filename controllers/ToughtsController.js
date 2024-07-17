const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = class ThoughtController {

    static async showThoughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard')
    }
}