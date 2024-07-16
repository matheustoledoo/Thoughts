const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const Filestore = require('session-file-store')(session)
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
const ToughtController = require("./controllers/ToughtsController");

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
        name: "session",
        secret: "we_secret",
        resave: false,
        saveUninitialized: false,
        store: new Filestore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now(), 360000),
            httpOnly: true
        }
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
app.get('/', ToughtController.showThoughts)



// database connection
conn
 .sync()
 .then(() => {
    app.listen(3000)
 })
 .catch((error: any) => console.log(error))