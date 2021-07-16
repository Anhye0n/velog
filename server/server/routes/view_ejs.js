const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

const now = new Date();
let year = now.getFullYear()
let month = now.getMonth()
let date = now.getDate()
let hour = now.getHours()
let minute = now.getMinutes()
let second = now.getSeconds()

const now_date = year + '-' + month + 1 + '-' + date
const now_time = hour + ':' + minute + ':' + second

router.get('/', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    console.log(now_date + ' :: ' + now_time)
    res.render('./index', {'user': user});
})

router.get('/user/register', (req, res) => {
    res.render('./user/register');
})

router.get('/user/login', (req, res) => {
    let err = req.flash('error')
    let user = req.user

    res.render('./user/login', {'errMsg': err, 'user': user});
})

router.get('/user/regi_success', (req, res) => {
    res.render('./user/regi_success');
})

router.get('/user/my_info', (req, res) => {
    let user = req.user;
    res.render('./user/my_info', {'user': user});
})

// contents views
router.get('/contents/whoami', (req, res) => {
    let user = req.user;
    res.render('./contents/whoami', {'user': user});
})

// contents views
router.get('/contents/portfolio', (req, res) => {
    let user = req.user;
    res.render('./contents/portfolio', {'user': user});
})

router.get('/contents/all_article', (req, res) => {
    let user = req.user;
    res.render('./contents/all_article', {'user': user});
})

router.get('/contents/all_categories', (req, res) => {
    let user = req.user;
    res.render('./contents/all_categories', {'user': user});
})

router.get('/contents/site_info', (req, res) => {
    let user = req.user;
    res.render('./contents/site_info', {'user': user});
})

router.get('/contents/board_write', (req, res) => {
    let user = req.user;
    let sql = "SELECT * FROM categories"
    let categories = []
    conn.query(sql, function (err, rows) {
        for (i = 0; i < rows.length; i++) {
            // console.log(rows[i].categories)
            categories[i] = rows[i].categories
        }

        console.log('================')
        console.log(categories)
        console.log('================')
        res.render('./contents/board_write', {'user': user, 'categories': categories});
    })
})

module.exports = router