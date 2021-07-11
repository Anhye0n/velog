const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    //user가 들어있지 않을 때 에러가 나지 않기 위해 아래 처럼 설정
    user = req.user;
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
    let user = req.user
    res.render('./user/login', {'errMsg': msg, 'user': user});
})

router.get('/user/regi_success', (req, res) => {

    res.render('./user/regi_success');
})

module.exports = router