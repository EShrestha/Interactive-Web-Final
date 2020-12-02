const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:Adminpassword@cluster0.7kwux.mongodb.net/myDB?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {

});

let userSchema = mongoose.Schema({
    fullName: String,
    username: String,
    age: String,
    email: String,
    password: String,
    q1: String,
    q2: String,
    q3: String,
});

let User = mongoose.model('User_Collection', userSchema);





exports.index = (req, res) => {
    let today = new Date();
    let date = `${today.getMonth()}-${today.getDate()}-${today.getFullYear()}     ${(today.getHours() + 24) % 12 || 12}:${today.getMinutes()}:${today.getSeconds()}`
    

    let displayDate = '';
    if (req.cookies.lastVisit) {
        displayDate = `Last Visited: ${req.cookies.lastVisit}`;
    } else {
        displayDate = `Welcome!`
    }
    
    res.cookie('lastVisit', date, { maxAge: 999999999999 });



    res.render('index', {
        title: 'Home',
        icon_href: '/images/home.png',
        lastVisitedTime: displayDate
    });
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login',
        icon_href: '/images/login.png',
        css_href: '/login.css'
    });
}

exports.verifyLogin = async (req, res) => {

    let user = await User.findOne({ username: req.body.username });
    if (user == null) {
        res.redirect('/login');
        console.log(`*Username: "${req.body.username}" not found in database.*`);
    } else {
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            // once user and pass are verified then we create a session with any key:value pair we want, which we can check for later
            req.session.user = {
                isAuthenticated: true,
                username: user.username
            }
            console.log(`User: "${req.body.username}" was authenticated.`);
            //Once logged in redirect to this page
            res.redirect('/edit');
        } else {
            res.redirect('/login');
            console.log(`*Failed to log in, user "${req.body.username}" entered the wrong password.`);
        }

    }
}


exports.create = (req, res) => {
    res.render('create', {
        title: 'Create Account',
        icon_href: '/images/create.png',
        css_href: '/create.css'
    });
}

exports.createUser = async (req, res) => {
    console.log(`${req.body.fname}`)
    console.log(`${req.body.username}`)
    console.log(`${req.body.age}`)
    console.log(`${req.body.email}`)
    console.log(`${req.body.q1}`)
    console.log(`${req.body.q2}`)
    console.log(`${req.body.q3}`)
    console.log(`${req.body.password}`)



    let dbUser = await User.findOne({ username: req.body.username });

    if (dbUser == null) {
        console.log('DB USER IS NULL')

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        let user = new User({
            fullName: req.body.fname,
            username: req.body.username,
            age: req.body.username,
            email: req.body.email,
            password: hash,
            q1: req.body.q1,
            q2: req.body.q2,
            q3: req.body.q3
        });
        user.save((err, user) => {
            if (err) return console.error(err);
            console.log(user.firstName + ' added');
        });
        res.redirect('/login');
    } else {
        res.render('create', {
            title: 'Create Account',
            icon_href: '/images/create.png',
            css_href: '/create.css',
            script_src: 'create.js',
        });
        console.log(`*Username: "${req.body.username}" already exists.*`);
    }


}

exports.editUser = (req, res) => {
    res.render('edit', {
        title: 'Edit Account',
        icon_href: '/images/edit.png',
        css_href: '/edit.css'
    });
}

exports.updateUser = (req, res) => {
    // Update db here
}

exports.edit = (req, res) => {

    let user = req.session.user.username
    // find user by username req.session.user.username

    res.render('edit', {
        title: 'Edit Account',
        icon_href: '/images/create.png',
        css_href: '/create.css',
        _Username: req.body.username
    })
}


exports.updateUser = (req, res) => {
    // find user in DB req.body.username

    //update info use req.body
}










exports.lost = (req, res) => {
    res.render('lost', {
        title: 'Lost?',
        css_href: 'lost.css',
        icon_href: '/images/lost.png'
    });
}