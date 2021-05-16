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
const user_info = require('./routes/user')

app.use(bodyParser.urlencoded({extend:false}))

app.use(bodyParser.json())

app.use('/', serveStatic(path.join(__dirname, '../views'))) //메인

app.use('/user/regitser', serveStatic(path.join(__dirname, '../views/register.html'))) //회원가입

app.use('/user/login', serveStatic(path.join(__dirname, '../views/login.html'))) //로그인


app.use(express.static('src/css'))

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})
