const express = require('express')
const app = express()

// DB
const db_info = require('../conf/db_info')
const conn = db_info.init()

//모듈
const bodyParser = require('body-parser'), serveStatic = require('serve-static'), path = require('path')
const passport = require('passport')
//session
const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)

app.use(bodyParser.urlencoded({extend:false}))

app.use(bodyParser.json())

//views 라우터
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

//라우터
const user_info = require('./routes/user')
app.use('/api', user_info)

//views 파일
const view_router = require('./routes/view_ejs')
app.use('/', view_router)

const db_test = require('./routes/admin')
app.use('/admin', db_test)

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})

module.exports = app