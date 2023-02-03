const mysql = require ('mysql'); //* allow u to acces our database
const jwt = require('jsonwebtoken'); // tokenek miatt kellenek 
const bcrypt = require('bcryptjs'); // passwor has miatt kell
const dotenv = require('dotenv');// env kornyezet kialakitas
dotenv.config({ path: './.env'}); 
const { promisify } = require("util");

const db = mysql.createConnection({ // db hez valo kapcsolodas
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
// register

exports.register = (req,res) =>{
console.log(req.body);

/*const name = req.body.name;
const email = req.body.email;
const password = req.body.password;
const passwordConfirm = req.body.passwordConfirm;
const username = req.body.username; */

const{ name, email, password, passwordConfirm, username} = req.body;

db.query('SELECT email FROM user WHERE email = ?',[email], async (error , results)=> {
    if(error){
        console.log(error);
    }
    if( results.length > 0 ){
        return res.render('register',{
            message: 'That email is already in use!'
        });
    } else if ( password !== passwordConfirm ){
        return res.render('register', {
            message: 'Password do not match!'
        });
    }

    db.query('SELECT username FROM user WHERE username = ?',[username], async (error , results)=> {
        if(error){
            console.log(error);
        }
        if( results.length > 0 ){
            return res.render('register',{
                message: 'That username is already in use!'
            });
        } 
    })

let hashedPassword = await bcrypt.hash(password, 8);

console.log(hashedPassword);


db.query('INSERT INTO user SET ?', {name: name, username: username, email: email, password: hashedPassword }, (error , results) => {
    if(error){
        console.log(error);
    }else{
        console.log(results);
        return res.render('login',{
            message: 'User registered'
        });
    }
})


});
}

// login

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render("login", {
                message: "Please Provide an username and password"
            })
        }
        db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
            console.log(results);
            if (!results || !await bcrypt.compare(password, results[0].password)) {
                res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userSave', token, cookieOptions);
                res.status(200).redirect("/profile");
            }
        })
    } catch (err) {
        console.log(err);
    }
}


// is logged in
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist
            db.query('SELECT * FROM user WHERE id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }
}

// logout
exports.logout = (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}