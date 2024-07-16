"use strict";
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const flash = require('express-flash');
const app = express();
const conn = require('./db/conn.js');
const Thought = require('./models/Thought.js');
const User = require('./models/User.js');
const toughtsRoutes = require('./routes/toughtsRoutes');
const ToughtController = require("./controllers/ToughtsController");
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(session({
    name: "session",
    secret: "we_secret",
    resave: false,
    saveUninitialized: false,
    store: new Filestore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now(), 360000),
        httpOnly: true
    }
}));
app.use(flash());
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});
app.use("/toughts", toughtsRoutes);
app.get('/', ToughtController.showThoughts);
conn
    .sync()
    .then(() => {
    app.listen(3000);
})
    .catch((error) => console.log(error));
