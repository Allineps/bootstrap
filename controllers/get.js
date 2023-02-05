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
    res.status(200)
console.log(req.body);
}

// login
exports.login = (req,res) =>{
    res.status(200)
console.log(req.body);
}




// logout
exports.logout = (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}