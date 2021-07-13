const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./user/index', {'user': user});
})

router.get('/admin', (req, res) => {
    let user = req.user
    res.render('./admin/index', {'user': user});
})

router.get('/admin/auto_increment_reset', (req, res) => {
    let user = req.user

    res.render('./admin/auto_increment_reset', {'user': user});
})
router.get('/admin/decrypto_test', (req, res) => {
    let user = req.user

    res.render('./admin/decrypto_test', {'user': user});
})

router.get('/user/register', (req, res) => {
    res.render('./user/register');
})

router.get('/user/login', (req, res) => {
    let err = req.flash('error')
    let user = req.user

    res.render('./user/login', {'errMsg': err, 'user': user});
})

router.get('/user/regi_success', (req, res) => {

    res.render('./user/regi_success');
})

module.exports = router