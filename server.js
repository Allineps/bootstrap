const cookieParser = require('cookie-parser');
const express = require('express'); /* use for create server*/ 
const path = require('path'); //* path allow us to know our html,css files location
const db = require('./routes/db-config'); // itt tal'lhato a db eleres 
const app = express();
const cookie = require('cookie-parser');
const publicDirectory = path.join(__dirname,'./public');

app.use(express.static(publicDirectory));
// parse Url- encoded bodies on any forms 
app.use(express.urlencoded({extended:false}));
// parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs');
app.use(cookie());


db.connect( (error) =>{ // dbhez valo kapcsolodas , helyes adatok megadasa ellenorzes
    if(error){
        console.log(error)
    }else{
        console.log("mysql connected....")
    }
})


app.use ('/auth',require('./routes/auth'));
// define routes
app.use('/' , require('./routes/pages')); 
//* 3000 ezres porton tudjuk majd elerni a weboldalt
app.listen(3000, (req, res) =>{
    console.log ('listening on port 3000..........!') 
})