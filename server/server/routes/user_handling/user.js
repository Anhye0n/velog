const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//passport
const passport = require('passport')

//fs
const fs = require('fs'), path = require('path')

//multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../../src/img/list')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname)
    }
})
const upload = multer({storage: storage})

// /api/user/register가 아닌 /user/register로 하기.
router.post('/user/register', function (req, res, next) {

    let name = req.body.user_name // 포스트 방식은 body, get 방식은 query
    let email = req.body.email
    let id = req.body.id
    let password = req.body.password

    // 암호화
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString("base64"), 100, 64, 'sha512', (err, key) => {
            let de_password = key.toString("base64")
            let user_salt = buf.toString("base64")

            let user_regi = [name, email, id, de_password, user_salt]

            //email_exist와 id_exist에 각각 데이터가 존재하면 1이 반환됨. 없을 시 0
            let check_email_sql = "select EXISTS (SELECT * FROM user_info where email=? limit 1) as email_exist;" +
                "select EXISTS (SELECT * FROM user_info where id=? limit 1) as id_exist;"

            conn.query(check_email_sql, [email, id], function (err, result) {
                if (result[0][0].email_exist === 1 && result[1][0].id_exist === 1) {
                    res.render('./user/register', {
                        'err_email': 'The Email already exists.\n',
                        'err_id': 'The ID already exists.\n'
                    })
                } else if (result[1][0].id_exist === 1) {
                    res.render('./user/register', {'err_id': 'The ID already exists.'})
                } else if (result[0][0].email_exist === 1) {
                    res.render('./user/register', {'err_email': 'The Email already exists.'})
                } else {
                    let sql = "INSERT INTO user_info (name, email, id, password, user_salt) VALUES (?, ?, ?, ?, ?)";

                    conn.query(sql, user_regi, function (err, result) {
                        if (err) {
                            console.log('query is not excuted. insert fail...\n' + err);
                        } else {
                            console.log('User ### ' + id + ' ### Register!')
                            res.render('./user/regi_success', {'email': email, 'id': id, 'name': name,})
                        }
                    });
                }
            })
        })
    })
});

router.post('/user/board_write', function (req, res, next) {
    const now = new Date();
    let year = now.getFullYear()
    let month = Number(now.getMonth()) + 1
    let date = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    const now_date = year + '-' + month + '-' + date
    const now_time = hour + ':' + minute + ':' + second

    let title = req.body.title
    let categori = req.body.categories
    let writer = req.body.writer
    let content = req.body.contents

    let sql = "INSERT INTO board (title, categori, content, writer, date) VALUES (?,?,?,?,?)"

    conn.query(sql, [title, categori, content, writer, now_date + ' ' + now_time], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log('')
            console.log('##################')
            console.log(writer + 'posting an article!')
            console.log('##################')
            console.log('')
            res.redirect('http://anhye0n.me/contents/all_article')
        }
    })
    // 암호화

});

router.post('/user/edit', (req, res) => {
    let edit_title = req.body.title
    let original_value = req.body.original_value
    let edit_categori = req.body.categories
    let edit_contents = req.body.contents
    let edit_sql = "UPDATE board SET title=?, categori=?, content=? WHERE title=?"

    conn.query(edit_sql, [edit_title, edit_categori, edit_contents, original_value], function (err, rows) {
        res.redirect('http://anhye0n.me/contents/all_article')
    })
});

router.get('/user/del_categori', (req, res) => {
    let user = req.user;

    let req_categories = req.query.categori_name
    let sql = "DELETE FROM categories WHERE categories=?"
    let select_sql = "SELECT * FROM categories WHERE categories=?"

    let all_sql = "SELECT * FROM categories"

    conn.query(select_sql, [req_categories], function (err, rows) {
        fs.unlink(path.join(__dirname, '../../../src/img/list/', rows[0].thumbnail), function (err) {
            if (err) throw err;
            console.log(rows[0].categories + 'has been deleted!')
        })
        conn.query(sql, [req_categories], function (err, rows) {
            conn.query(all_sql, function (err, rows) {

                res.render('./contents/edit_categori', {
                    'user': user,
                    'categories': rows,
                    'del_msg': 'Success Delete categori!!'
                })
            });
        })
    })
});

router.post('/user/add_categori', upload.single('categori_thumbnail'), (req, res) => {
    let user = req.user;

    let filename = req.file.filename
    let categori = req.body.categori_name

    let sql = "INSERT INTO categories(categories, thumbnail) VALUES (?,?)"

    let all_sql = "SELECT * FROM categories"

    conn.query(sql, [categori, filename], function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            conn.query(all_sql, function (err, rows) {

                res.render('./contents/edit_categori', {
                    'user': user,
                    'categories': rows,
                    'add_msg': 'Success Add categori !!'
                })
            });
        }
    })
});

router.post('/user/login', passport.authenticate('local-login', {
    // successRedirect: '/api/user/login_success',
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}), function (req, res) {
    req.session.save(function () {
        console.log('session save..')
        res.redirect('/api/user/login_success')
    })
})

router.get('/user/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
})

router.get('/user/login_success', (req, res) => {
    res.render('./user/login_success', {'user': req.user});
})

module.exports = router;