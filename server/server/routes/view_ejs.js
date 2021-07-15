const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

router.get('/', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
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
            categories[i] = "<option value='" + rows[i].categories + "'>" + rows[i].categories + "</option>\n"
        }
    })

    console.log(categories)
    console.log('================')
    res.render('./contents/board_write', {'user': user});
})

module.exports = router