var express = require('express');
var router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')


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

            var sql = "INSERT INTO user_info (name, email, id, password, user_salt) VALUES (?, ?, ?, ?, ?)";

            conn.query(sql, user_regi, function (err, result) {
                if (err) {
                    console.log('query is not excuted. insert fail...\n' + err);
                } else {
                    console.log('Success Insert!')
                    res.redirect('http://anhye0n.me/user/regi_success.html')
                }
            });
        })
    })
});



router.post('/user/login', function (req, res, next) {
    var id = req.body.id
    var password = req.body.password

    var id_sql = "SELECT exists (SELECT * FROM user_info WHERE id=?) as successs"
    conn.query(id_sql, id, function (err, result){
        console.log('id : '+ result)
    })

    // if (db_id === 0){
    //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    //     res.write('<script>alert(\'가입되지 않은 아이디 입니다.\')</script>')
    //     res.end('<script>location.href=\'http://anhye0n.me/user/login.html\'</script>')
    // }

    var salt_sql = "SELECT user_salt FROM user_info WHERE id=?"
    conn.query(salt_sql, id.toString(), function (err, result){
        console.log('salt : '+ result)
    })

    var db_password_sql = "SELECT password FROM user_info WHERE id=?"
    // password를 salt로 암호화한 값이 db_password랑 같은가?로 구현
    conn.query(db_password_sql, id, function (err, result){
        console.log('result : '+ result)
    })

    // 암호화
    // crypto.randomBytes(64, (err, buf) => {
    //     crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) => {
    //         var de_password = key.toString()
    //
    //         if (de_password === db_password){
    //             res.redirect('http://anhye0n.me/user/login_success.html')
    //         }else{
    //             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    //             res.write('<script>alert(\'비밀번호가 옳지 않습니다.\')</script>')
    //             res.end('<script>location.href=\'http://anhye0n.me/user/login.html\'</script>')
    //         }
    //     });
    // })
});

module.exports = router;