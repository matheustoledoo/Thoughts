const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

// express instance
const app = express()

// database
const conn = require('./db/conn.js')

// Models
const Thought = require('./models/Thought.js')
const User = require('./models/User.js')

// Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controllers
const ToughtController = require("./controllers/ToughtsController");
const authController = require('./controllers/authController.js')

// handlebars config
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// CSS
app.use(express.static('public'))

// body answare
app.use(
    express.urlencoded({
      extended: true,
    }),
  )

// json config
app.use(express.json())

// session middleware
app.use(
    session({
      name: 'session',
      secret: 'nosso_secret',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )

// flsh messages
app.use(flash())

//set session to res
app.use((req: { session: { userid: any } }, res: { locals: { session: any } }, next: any) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use("/toughts", toughtsRoutes);
app.use('/', authRoutes)
app.get('/', ToughtController.showThoughts)



// database connection
conn
 .sync()
 .then(() => {
    app.listen(3000)
 })
 .catch((error: any) => console.log(error))