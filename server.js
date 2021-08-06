require('./config/db');

const express = require('express');
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send('oh noo, algo salió mal')
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({mongooseConnection: mongoose.connection}),
    store: MongoStore.create({ mongoUrl: process.env.DATABASE })
}))

//Inicializador de Passport
app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport);

app.use(errorHandler);

app.use('/', router());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

module.exports = app;