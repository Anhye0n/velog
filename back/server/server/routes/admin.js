var express = require('express');
var router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

router.post('/decrypto', function (req, res, next) {

    var password = req.body.password
    var encrypto = req.body.encrypto
    // 암호화
    crypto.pbkdf2(password, encrypto, 100, 64, 'sha512', (err, key) => {
        // console.log(key.toString("base64"))
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<script>alert(\'복호화 값 가져옴\')</script>')
        res.end('<h1>복호화된 password</h1> <br><br>' + key.toString('base64'))
    });
})

router.post('/auto_increment_reset', function (req, res, next) {

    var last_num = req.body.last_num
    var user_regi = [Number(last_num)]

    var sql = "ALTER TABLE user_info AUTO_INCREMENT=1; SET @COUNT = 0; UPDATE user_info SET num = @COUNT:=@COUNT+1; ALTER TABLE user_info AUTO_INCREMENT= ? ;"

    conn.query(sql, user_regi, function (err, result) {
        if (err) {
            console.log('query is not excuted. rest fail...\n' + err);
        } else {
            console.log('초기화 성공!')
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write("<script type='text/javascript'>alert(\'auto increment 수정됨\'); location.href='/'</script>")
            res.end()
        }
    });
})

module.exports = router