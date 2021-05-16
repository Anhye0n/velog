const express = require('express')
const app = express()

const db_info = require('../conf/db_info')
const conn = db_info.init()

const fs = require('fs')
const bodyParser = require('body-parser'), serveStatic = require('serve-static'), path = require('path')

app.use(bodyParser.urlencoded({extend:false}))

app.use(bodyParser.json())

app.use('/', serveStatic(path.join(__dirname, '../views')))


app.get('/list', function (req, res) {
    var sql = 'INSERT INTO board (id, title, content) VALUES (\'Company Inc\', \'Highway 37\', \'asdf\')';

    conn.query(sql, function (err, result) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!'+ result)
    });
});

app.use(express.static('src/css'))

app.listen(80, () => {
    console.log(`Example app listening at http://anhye0n.me`)
})
