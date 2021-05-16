const express = require('express')
const app = express()

//DB
const db_info = require('../conf/db_info')
const conn = db_info.init()

//모듈
const fs = require('fs')
const bodyParser = require('body-parser'), serveStatic = require('serve-static'), path = require('path')
const passport = require('passport')

//라우터
// const user_info = require('./routes/user')
var router = express.Router();

router.post('/api/user/register', function (req, res, next) {

    var name = req.body.name // 포스트 방식은 body, get 방식은 query
    var id = req.body.id
    var email = req.body.email
    var password = req.body.password

    var sql = 'INSERT INTO user_info (name, email, id, password) VALUES (name, email, id, password)';

    conn.query(sql, function (err, result) {
        if (err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!')
    });
});
app.use(bodyParser.urlencoded({extend:false}))

app.use(bodyParser.json())

app.use('/user', serveStatic(path.join(__dirname, '../views'))) //메인 주소
//
// app.use('/', express.static(__dirname + '../views'))
// app.use('/user/register', regitser)
// app.use('/user/login', express.static('../views'))


app.use(express.static('src/css'))

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})
