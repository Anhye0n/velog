const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

//crypto
const session = require('express-session')

router.get('/', (req, res) => {
    res.render('index');
})
router.get('/user/register', (req, res) => {
    res.render('register');
})
router.get('/user/login', (req, res) => {
    res.render('login');
})
router.get('/user/login_success', (req, res) => {
    res.render('login_success');
})
router.get('/user/regi_success', (req, res) => {
    res.render('regi_success');
})

module.exports = router