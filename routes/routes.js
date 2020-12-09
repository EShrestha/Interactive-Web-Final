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
            res.redirect('/lost')
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

exports.edit = async (req, res) => {

    let username = req.session.user.username
    
    let user =  await User.findOne({username}, {_id:0, __v: 0}).catch(function (err, users) {
        if (err) return handleError(err)
    })
    //find user by username req.session.user.username
    // console.log("User" + user)
    // console.log(user.username)
    // console.log(user.password)

    res.render('edit', {
        title: 'Edit Account',
        icon_href: '/images/create.png',
        css_href: '/create.css',
        _FName: user.fullName,
        _Username: user.username,
        _Age: user.age,
        _Email: user.email,
        _PassWD: user.password,
        user
        })
}


exports.updateUser = async (req, res) => {
    // find user in DB req.body.username
    console.log(req.body)
    console.log(req.body.password)
    console.log(req.body.vpassword)
    let username = req.session.user.username

    let user =  await User.findOne({username}).catch(function (err, users) {
        if (err) return handleError(err)
    })
    console.log("User " + user)
    user.fullName = req.body.fname
    user.username = req.body.username
    user.age = req.body.age
    user.q1 = req.body.q1
    user.q2 = req.body.q2
    user.q3 = req.body.q3

    if(req.body.password != "" & req.body.vpassword != "") {
        if(req.body.vpassword != req.body.password) {
            console.log("The passwords do not match")
            res.redirect("/edit")
        }else
            var salty = bcrypt.genSaltSync(10);
            var hashy = bcrypt.hashSync(req.body.password, salty);
            user.password = hashy
    }else if(req.body.password != "" & req.body.vpassword == ""){
        console.log("The passwords do not match")
        res.redirect("/edit")
    }

    console.log("User2 " + user)

    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(user.fullName + ' Changed');
    });
    res.redirect('/')
    //update info use req.body
}


exports.sendApi(req, res) {
    {
        "q1": 34,
        "q2": 2,
        "q3": 6     
    }
}







exports.lost = (req, res) => {
    res.render('lost', {
        title: 'Lost?',
        css_href: 'lost.css',
        icon_href: '/images/lost.png'
    });
}