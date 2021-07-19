//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//session

//passport
const LocalStrategy = require('passport-local').Strategy

//app.js에서 passport 모듈 가져옴
module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log('serializeUser : ', user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser_id : ', user)

        done(null, user)
        // })
    });

    passport.use('local-login', new LocalStrategy({
        // Form에서 post로 받아온 값임.
        // 기본값은 username, password이지만 이름이 다르게 설정되있으면 여기서 설정
        usernameField: 'id',
        passwordField: 'password',
    }, function (username, password, done) {
        let sql = "SELECT exists (SELECT * FROM user_info WHERE id=?) as success;"

        conn.query(sql, username, function (err, result) {
            let id = result[0].success;
            if (err) {
                return done(err);
            } else if (id === 0) {
                return done(null, false, {message: 'Incorrect ID.'});
            } else if (id === 1) {
                let in_sql = "SELECT user_salt FROM user_info WHERE id=?;" +
                    "SELECT password FROM user_info WHERE id=?;" +
                    "SELECT name FROM user_info WHERE id=?;" +
                    "SELECT email FROM user_info WHERE id=?;"

                conn.query(in_sql, [username, username, username, username], function (err, result) {
                    let salt = result[0][0].user_salt
                    let db_password = result[1][0].password
                    let db_name = result[2][0].name
                    let db_email = result[3][0].email

                    crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) => {
                        let de_password = key.toString("base64")
                        // 비밀번호 맞을 때
                        if (de_password === db_password) {
                            // req.session.user_id = username
                            // req.session.save()
                            const user = {
                                id: username,
                                name: db_name,
                                email: db_email
                            }
                            return done(null, user);
                        } else { // 비밀번호 안 맞을 때
                            return done(null, false, {message: 'Incorrect password.'});
                        }
                    });
                })
            }
        })
    }));
}