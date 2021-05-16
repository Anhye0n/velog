var express = require('express');
var router = express.Router();

router.get('/api/register', function(req, res, next) {
    var sql = 'INSERT INTO user_info (name, email, id, password) VALUES (\'Company Inc\', \'Highway 37\', \'asdf\')';

    conn.query(sql, function (err, result) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        console.log('Success Insert!'+ result)
    });
});

module.exports = router;