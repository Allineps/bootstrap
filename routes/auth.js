const express = require('express');
const authController = require('../controllers/auth');
const getController = require('../controllers/get');

const Router = express.Router();

Router.post('/register', authController.register);
Router.post('/login', authController.login);
Router.get('/logout', getController.logout);
Router.get('/register', getController.register);

Router.get('/',(res,req)=>{
    res.json({message: 'hello from api'})
})

module.exports = Router;