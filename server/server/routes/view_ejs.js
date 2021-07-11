const express = require('express');
const router = express.Router();

//session에 담긴 user정보
//req로 접근 가능

router.get('/', (req, res) => {
    let user;
    let user_info = req.user
    if (user_info) {
        user = user_info;
    }
    res.render('./user/index', {'user': user});
})

router.get('/admin/auto_increment_reset', (req, res) => {

    res.render('./admin/auto_increment_reset');
})
router.get('/admin/decrypto_test', (req, res) => {

    res.render('./admin/decrypto_test');
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