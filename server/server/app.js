const express = require('express')
const app = express()

// DB
const db_info = require('../conf/db_info')

//모듈
const bodyParser = require('body-parser'), path = require('path')
const passport = require('passport')

//session
const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)
const flash = require('connect-flash')

app.use(bodyParser.urlencoded({extend: false}))

app.use(bodyParser.json())

app.use(session({
    secret: 'session key',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(db_info.db_info),
    cookie: {maxAge: 1000 * 60 * 60} // 1시간
}))

require('./routes/user_handling/passport')(passport)

app.use(passport.initialize()) //passport를 사용하도록 설정
app.use(passport.session()) // passport 사용 시 session을 활용
app.use(flash())

//src 파일 경로
app.use('/src', express.static(path.join(__dirname, '../src')))

//ejs 사용
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

//유저 핸들링 라우터
const user_info = require('./routes/user_handling/user')
app.use('/api', user_info)

//views 파일 라우터
const view_router = require('./routes/view_ejs')
app.use('/', view_router)

//어드민 파일 라우터
const db_test = require('./routes/admin/admin')
app.use('/api/admin', db_test)

//어드민 views 파일 라우터
const admin_view = require('./routes/admin/admin_view')
app.use('/admin', admin_view)

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})

module.exports = app