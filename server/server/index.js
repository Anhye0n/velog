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

//views 라우터
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

const view_router = require('./routes/view_ejs')
app.use('/', view_router)

app.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('info', 'Flash is back!')
    res.send('flash')
    res.redirect('/');
});

app.get('/', function(req, res){
    // Get an array of flash messages by passing the key to req.flash()
    res.render('index', { messages: req.flash('info') });
});
// app.set('views', path.join(__dirname, '../views/'))
//
// app.get('/', (req, res) => {
//     res.render('index');
// })
//
//
// app.use('/', serveStatic(path.join(__dirname, '../views'))) //메인 주소
//
// app.use('/user', serveStatic(path.join(__dirname, '../views/user'))) //유저 관리 주소

//라우터
const user_info = require('./routes/user')
app.use('/api', user_info)

const db_test = require('./routes/admin')
app.use('/admin', db_test)





app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})
