const mysql = require ('mysql'); //* db hez  kapcsolodast engedi 
const dotenv = require('dotenv');// env kornyezet kialakitas
dotenv.config({ path: './.env'}); 

const db = mysql.createConnection({ // db hez valo kapcsolodas minden ay .env be hivatkzva
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

module.exports = db;
