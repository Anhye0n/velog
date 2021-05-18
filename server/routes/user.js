var express = require('express');
var router = express.Router();

router.post('/api/user/register', function (req, res, next) {

    var name = req.body.name // 포스트 방식은 body, get 방식은 query
    var email = req.body.email
    var id = req.body.id
    var password = req.body.password

    var sql = 'INSERT INTO user_info (name, email, id, password) VALUES (name, email, id, password)';

    conn.query(sql, function (err, result) {
        if (err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!')
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