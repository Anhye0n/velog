const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//passport
const passport = require('passport')

//Date
const now = new Date();
let year = now.getFullYear()
let month = now.getMonth()
let date = now.getDate()
let hour = now.getHours()
let minute = now.getMinutes()
let second = now.getSeconds()

const now_date = year + '-' + month + 1 + '-' + date
const now_time = hour + ':' + minute + ':' + second

// /api/user/register가 아닌 /user/register로 하기.
router.post('/user/register', function (req, res, next) {

    let name = req.body.user_name // 포스트 방식은 body, get 방식은 query
    let email = req.body.email
    let id = req.body.id
    let password = req.body.password

    // 암호화
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString("base64"), 100, 64, 'sha512', (err, key) => {
            let de_password = key.toString("base64")
            let user_salt = buf.toString("base64")

            let user_regi = [name, email, id, de_password, user_salt]

            //email_exist와 id_exist에 각각 데이터가 존재하면 1이 반환됨. 없을 시 0
            let check_email_sql = "select EXISTS (SELECT * FROM user_info where email=? limit 1) as email_exist;" +
                "select EXISTS (SELECT * FROM user_info where id=? limit 1) as id_exist;"

            conn.query(check_email_sql, [email, id], function (err, result) {
                if (result[0][0].email_exist === 1 && result[1][0].id_exist === 1) {
                    res.render('./user/register', {
                        'err_email': 'The ID already exists.\n',
                        'err_id': 'The Email already exists.\n'
                    })
                } else if (result[1][0].id_exist === 1) {
                    res.render('./user/register', {'err_id': 'The ID already exists.'})
                } else if (result[0][0].email_exist === 1) {
                    res.render('./user/register', {'err_email': 'The Email already exists.'})
                } else {
                    let sql = "INSERT INTO user_info (name, email, id, password, user_salt) VALUES (?, ?, ?, ?, ?)";

                    conn.query(sql, user_regi, function (err, result) {
                        if (err) {
                            console.log('query is not excuted. insert fail...\n' + err);
                        } else {
                            console.log('User ### ' + id + ' ### Register!')
                            res.render('./user/regi_success', {'email': email, 'id': id, 'name': name,})
                        }
                    });
                }
            })
        })
    })
});

router.post('/user/board_write', function (req, res, next) {

    let title = req.body.title
    let categori = req.body.categories
    let writer = req.body.writer
    let content = req.body.contents

    let sql = "INSERT INTO board (title, categori, content, writer, date) VALUES (?,?,?,?,?)"

    conn.query(sql, [title, categori, content, writer, now_date + ' ' + now_time], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log('##################')
            console.log('')
            console.log('contents insert succcess')
            console.log('')
            console.log('##################')
        }
    })
    // 암호화

});

router.post('/user/login', passport.authenticate('local-login', {
    // successRedirect: '/api/user/login_success',
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}), function (req, res) {
    req.session.save(function () {
        console.log('session save..')
        res.redirect('/api/user/login_success')
    })
})

router.get('/user/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
})

router.get('/user/login_success', (req, res) => {
    res.render('./user/login_success', {'user': req.user});
})

module.exports = router;