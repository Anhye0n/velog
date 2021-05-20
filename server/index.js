const express = require('express')
const app = express()

// DB
// const db_info = require('../conf/db_info')
// const conn = db_info.init()

//모듈
const bodyParser = require('body-parser'), serveStatic = require('serve-static'), path = require('path')
const passport = require('passport')


app.use(bodyParser.urlencoded({extend:false}))

app.use(bodyParser.json())

app.use('/', serveStatic(path.join(__dirname, '../views'))) //메인 주소

app.use('/user', serveStatic(path.join(__dirname, '../views/user'))) //로그인 주소

//라우터
const user_info = require('./routes/user')
app.use('/api', user_info)

const db_test = require('./routes/temp')
app.use('/admin', db_test)
//
// app.use('/', express.static(__dirname + '../views'))
// app.use('/user/register', regitser)
// app.use('/user/login', express.static('../views'))


app.use(express.static('src/css'))

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})
