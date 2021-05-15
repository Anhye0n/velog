const express = require('express')
const app = express()
const port = 80

app.use(function (req, res, next){
    console.log('첫 번째 미들웨어에서 요청을 처리함.')
    req.user = 'mike'

    next()
})

app.use('/', function (req, res){
    console.log('두 번째 미들웨어에서 요청을 처리함.')

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
    res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과 입니다.</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
