const express = require('express')
const app = express()
const port = 80
const db_info = require('../conf/db_info')
const conn = db_info.init()


app.get('/list', function (req, res) {
    var sql = 'INSERT INTO customers (id, title, content) VALUES (\'Company Inc\', \'Highway 37\', \'asdf\')';

    conn.query(sql, function (err, result) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!'+ result)
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
