"use strict";
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const app = express();
const conn = require('./db/conn.js');
const Thought = require('./models/Thought.js');
const User = require('./models/User.js');
const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');
const ToughtController = require("./controllers/ToughtsController");
const authController = require('./controllers/authController.js');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    },
}));
app.use(flash());
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});
app.use("/toughts", toughtsRoutes);
app.use('/', authRoutes);
app.get('/', ToughtController.showThoughts);
conn
    .sync()
    .then(() => {
    app.listen(3000);
})
    .catch((error) => console.log(error));
