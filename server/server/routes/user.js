const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//session
const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)

router.use(session({
    secret: 'session key',
    resave: false,
    saveUninitialized: true,
    store: new mysqlStore(db_info.db_info)
}))

console.log(db_info.db_info)

// /api/user/register가 아닌 /user/register로 하기.
router.post('/user/register', function (req, res) {

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

            var sql = "INSERT INTO user_info (name, email, id, password, user_salt) VALUES (?, ?, ?, ?, ?)";

            conn.query(sql, user_regi, function (err, result) {
                if (err) {
                    console.log('query is not excuted. insert fail...\n' + err);
                } else {
                    console.log('Success Insert!')
                    res.redirect('http://anhye0n.me/user/regi_success')
                }
            });
        })
    })
});


router.post('/user/login', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;

    //id 유무 확인
    //id가 있으면 success의 이름으로 1이 반환되고, 없으면 0이 반환됨.
    var sql = "SELECT exists (SELECT * FROM user_info WHERE id=?) as success;"

    conn.query(sql, id, function (err, result) {
        if (err) throw err;
        var db_id = result[0].success

        //id 안맞을 때
        if (db_id === 0) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write('<script>alert(\'가입되지 않은 아이디 입니다.\')</script>')
            res.end('<script>location.href=\'http://anhye0n.me/user/login\'</script>')
        } else if (db_id === 1) { //id가 있을 때

            var in_sql = "SELECT user_salt FROM user_info WHERE id=?;" +
                "SELECT password FROM user_info WHERE id=?;" +
                "SELECT id FROM user_info WHERE id=?;"

            conn.query(in_sql, [id, id, id], function (err, result) {
                var salt = result[0][0].user_salt
                var db_password = result[1][0].password
                var db_id_value = result[2][0].id

                crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) => {
                    var de_password = key.toString("base64")
                    // 비밀번호 맞을 때
                    if (de_password === db_password) {
                        req.session.user_id = db_id_value
                        req.session.save(function () {
                            res.redirect('http://anhye0n.me/user/login_success')
                        })
                        console.log('session : ', req.session)

                    } else { // 비밀번호 안 맞을 때
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<script>alert(\'비밀번호가 옳지 않습니다.\')</script>')
                        res.end('<script>location.href=\'http://anhye0n.me/user/login\'</script>')
                    }
                });
            })
        }
    })
});
router.get('/user/logout', function (req, res) {
    delete req.session.user_id
    req.session.save(function () {
        res.redirect('http://anhye0n.me/user')
    })
})
module.exports = router;