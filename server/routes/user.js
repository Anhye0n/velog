var express = require('express');
var router = express.Router();
//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

// /api/user/register가 아닌 /user/register로 하기.
router.post('/user/register', function (req, res, next) {

    var name = req.body.user_name // 포스트 방식은 body, get 방식은 query
    var email = req.body.email
    var id = req.body.id
    var password = req.body.password

    var sql = "INSERT INTO user_info (name, email, id, password) VALUES (?, ?, ?, ?)";

    conn.query(sql, [name, email, id, password],function (err, result) {
        if (err) {
            console.log('query is not excuted. select fail...\n' + err);
        }else{
            console.log('Success Insert!')
            alert('회원가입에 성공하셨습니다!')
            res.redirect('http://anhye0n.me/user/')
        }
    });
});
//
// router.get('/api/user/login', function (req, res, next) {
//     var sql = 'INSERT INTO user_info (name, email, id, password) VALUES (\'Company Inc\', \'Highway 37\', \'asdf\')';
//
//     conn.query(sql, function (err, result) {
//         if (err) console.log('query is not excuted. select fail...\n' + err);
//         console.log('Success Insert!' + result)
//     });
// });

module.exports = router;