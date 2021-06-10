const express = require('express');
const router = express.Router();

const sess = req.session;


router.get('/', (req, res) => {
    res.render('./user/index', {
        sess: sess
    });
    console.log(sess)
})
router.get('/user/register', (req, res) => {
    res.render('./user/register', {
        sess: sess
    });
})
router.get('/user/login', (req, res) => {
    res.render('./user/login', {
        sess: sess
    });
})
router.get('/user/login_success', (req, res) => {
    res.render('./user/login_success', {
        sess: sess
    });
})
router.get('/user/regi_success', (req, res) => {
    res.render('./user/regi_success', {
        sess: sess
    });
})
router.get('/admin/auto_increment_reset', (req, res) => {
    res.render('./admin/auto_increment_reset', {
        sess: sess
    });
})
router.get('/admin/decrypto_test', (req, res) => {
    res.render('./admin/decrypto_test', {
        sess: sess
    });
})

module.exports = router