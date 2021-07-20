const express = require('express')
const app = express()

// DB
const db_info = require('../conf/db_info')

//모듈
const bodyParser = require('body-parser'), path = require('path'), favicon = require('serve-favicon')
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

// favicon 설정
app.use(favicon(path.join(__dirname, '../src/img', 'favicon.ico')));

require('./routes/user_handling/passport')(passport)

app.use(passport.initialize()) //passport를 사용하도록 설정
app.use(passport.session()) // passport 사용 시 session을 활용
app.use(flash())

//src 파일 경로
app.use('/src', express.static(path.join(__dirname, '../src')))

//ejs 사용
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

//user handling 라우터
const user_info = require('./routes/user_handling/user')
app.use('/api', user_info)

//views 파일 라우터
const view_router = require('./routes/view_ejs')
app.use('/', view_router)

//admin 라우터
const db_test = require('./routes/admin/admin')
app.use('/api/admin', db_test)

//admin views 파일 라우터
const admin_view = require('./routes/admin/admin_view')
app.use('/admin', admin_view)

// app.listen(80, () => {
//     console.log(`Example app listening at http://anhye0n.me`)
// })

const http = require("http")
const https = require("https")
const fs = require("fs")

let privateKey = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/privkey.pem")
let certificate = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/cert.pem")
let ca = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/chain.pem")
const credentials = {key: privateKey, cert: certificate, ca: ca}

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

app.get("*", (req, res, next) => {
    console.log("req.secure == " + req.secure);

    if(req.secure){
        // --- https
        next();
    }else{
        // -- http
        let to = "https://" + req.headers.host + req.url;
        console.log("to ==> " + to);

        return res.redirect("https://" + req.headers.host + req.url);
    }
})

module.exports = app