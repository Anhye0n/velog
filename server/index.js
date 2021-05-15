const express = require('express')
const app = express()
const port = 80
const db_info = require('../conf/db_info')
const conn = db_info.init()

var router = require('./routes/main')(app);


app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




app.get('/list', function (req, res) {
    var sql = 'INSERT INTO board (id, title, content) VALUES (\'Company Inc\', \'Highway 37\', \'asdf\')';

    conn.query(sql, function (err, result) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!'+ result)
    });
});

app.use(express.static('src/css'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
