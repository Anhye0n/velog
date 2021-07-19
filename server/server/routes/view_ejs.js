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
    let fail_id = req.flash('fail_id')
    let fail_password = req.flash('fail_password')
    let user = req.user

    res.render('./user/login', {'fail_id': fail_id, 'fail_password': fail_password, 'user': user});
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

    let sql = "SELECT * FROM board"

    conn.query(sql, function (err, rows) {

        res.render('./contents/all_article', {'user': user, 'board': rows});
    })

})

router.get('/contents/all_categories', (req, res) => {
    let user = req.user;

    let sql = "SELECT * FROM categories"


    conn.query(sql, function (err, rows) {

        res.render('./contents/all_categories', {'user': user, 'categories': rows})
    });
})

router.get('/contents/categori_page', (req, res) => {
    let user = req.user;
    let req_categori_name = req.query.categori_name

    let sql = "SELECT * FROM board WHERE categori=?"


    conn.query(sql, [req_categori_name],function (err, rows) {

        res.render('./contents/categori_page', {'user': user, 'board': rows})
    });
})

router.get('/contents/edit_categori', (req, res) => {
    let user = req.user;

    let sql = "SELECT * FROM categories"


    conn.query(sql, function (err, rows) {

        res.render('./contents/edit_categori', {'user': user, 'categories': rows})
    });
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

        res.render('./contents/board_write', {'user': user, 'categories': categories});
    })
})

router.get('/contents/view', (req, res) => {
    let user = req.user;
    let req_title = req.query.title
    let sql = "SELECT * FROM board WHERE title=?"

    conn.query(sql, [req_title], function (err, rows) {
        res.render('./contents/content_view', {'user': user, 'board': rows});
    })
})

router.get('/contents/edit', (req, res) => {
    let user = req.user;
    let req_title = req.query.title
    let req_writer = req.query.writer
    let sql = "SELECT * FROM board WHERE title=?"

    let categori_sql = "SELECT * FROM categories"
    let categories = []
    conn.query(categori_sql, function (err, rows) {
        for (i = 0; i < rows.length; i++) {
            // console.log(rows[i].categories)
            categories[i] = rows[i].categories
        }
        conn.query(sql, [req_title], function (err, rows) {
            res.render('./contents/edit_board', {
                'user': user,
                'board': rows,
                'categories': categories,
                'writer': req_writer
            });
        })
    })
})

module.exports = router