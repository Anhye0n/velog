const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./user/index');
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
    res.render('./user/login', {'errMsg': msg});
})
router.get('/user/login_success', (req, res) => {

    res.render('./user/login_success', {'user_id': req.user.id});
})

router.get('/user/regi_success', (req, res) => {

    res.render('./user/regi_success');
})
router.get('/admin/auto_increment_reset', (req, res) => {

    res.render('./admin/auto_increment_reset');
})
router.get('/admin/decrypto_test', (req, res) => {

    res.render('./admin/decrypto_test');
})

module.exports = router