const user = require('user')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./user/index');
})

// 어드민 페이지
router.get('/admin/auto_increment_reset', (req, res) => {

    res.render('./admin/auto_increment_reset');
})
router.get('/admin/decrypto_test', (req, res) => {

    res.render('./admin/decrypto_test');
})

// login router 처리
router.get('/user/logout', function (req, res) {
    req.logout();
    req.session.save((err) => {
        if (err) throw err;
        res.redirect('/');
    });
})

router.get('/user/login_success', (req, res) => {
    res.render('./user/login_success', {'user': req.user});
})

router.get('/user/register', (req, res) => {
    res.render('./user/register');
})

router.get('/user/login', (req, res) => {
    let msg;
    let err = req.flash('error')
    if (err) {
        msg = err;
    }
    let user;
    let user_info = req.user
    if (user_info) {
        user = user_info;
    }
    res.render('./user/login',{'errMsg': msg, 'user': user});
})

router.get('/user/regi_success', (req, res) => {

    res.render('./user/regi_success');
})
module.exports = router