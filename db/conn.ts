const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Connection Database Sucessfull!')
} catch (error) {
    console.log(`Couldn´t connect: ${error}`)
}

module.exports = sequelize