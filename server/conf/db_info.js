var mysql = require('mysql');
var db_info = {
    host: 'localhost',
    user: 'root',
    password: 'xhdka2256',
    database: 'velog',
    multipleStatements: true,
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    // var conn = db_config.init();
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    },
    db_info
}
