const express = require('express');
const expressSession = require('express-session')
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser');


const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser('This is my passphrase'));
app.use(expressSession({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/')
    }
}

app.use(expressSession({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true
}));



app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.verifyLogin);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/edit', routes.edit)
app.post('/edit', urlencodedParser, routes.updateUser);

app.get('/*', routes.lost);


app.listen(3000);