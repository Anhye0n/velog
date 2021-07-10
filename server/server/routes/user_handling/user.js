const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//passport
const passport = require('passport')
const flash = require('connect-flash')
// /api/user/register가 아닌 /user/register로 하기.
router.post('/user/register', function (req, res, next) {

    var name = req.body.user_name // 포스트 방식은 body, get 방식은 query
    var email = req.body.email
    var id = req.body.id
    var password = req.body.password

    // 암호화
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString("base64"), 100, 64, 'sha512', (err, key) => {
            var de_password = key.toString("base64")
            var user_salt = buf.toString("base64")

            var user_regi = [name, email, id, de_password, user_salt]

            let check_email_sql = "select EXISTS (SELECT * FROM user_info where email=? limit 1) as email_exist; select EXISTS (SELECT * FROM user_info where id=? limit 1) as id_exist;"

            conn.query(check_email_sql, email, function (err, result, field) {
                console.log(result)
                // console.log(result[0].id_exist)
                console.log(result[1].id_exist)
                if (result[0].email_exist === 6) {
                    res.render('./user/register', {'errmsg': req.flash('Exist email')})
                } else {
                    var sql = "INSERT INTO user_info (name, email, id, password, user_salt) VALUES (?, ?, ?, ?, ?)";

                    conn.query(sql, user_regi, function (err, result) {
                        if (err) {
                            console.log('query is not excuted. insert fail...\n' + err);
                        } else {
                            console.log('Success Insert!')
                            res.redirect('http://anhye0n.me/user/regi_success')
                        }
                    });
                }
            })
        })
    })
});

router.post('/user/login', passport.authenticate('local-login', {
    successRedirect: '/api/user/login_success',
    failureRedirect: '/user/login',
    failureFlash: true
}), function (req, res) {
    req.session.save(function () {
        console.log('session save..')
        res.redirect('/api/user/login_success')
    })
})

router.get('/user/logout', function (req, res) {
    req.logout();
    req.session.save((err) => {
        if (err) throw err;
        res.redirect('/');
    });
})

router.get('/user/login_success', (req, res) => {
    res.render('./user/login_success', {'user': req.user});
})

module.exports = router;