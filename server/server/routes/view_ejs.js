const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./user/index', {
        sess: sess
    });
    console.log(sess)
})
router.get('/user/register', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./user/register', {
        sess: sess
    });
})
router.get('/user/login', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./user/login', {
        sess: sess
    });
})
router.get('/user/login_success', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./user/login_success', {
        sess: sess
    });
})
router.get('/user/regi_success', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./user/regi_success', {
        sess: sess
    });
})
router.get('/admin/auto_increment_reset', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./admin/auto_increment_reset', {
        sess: sess
    });
})
router.get('/admin/decrypto_test', (req, res) => {
    const sess = req.session;
    sess.user_id = 0
    sess.user_email = 0
    sess.user_name = 0
    res.render('./admin/decrypto_test', {
        sess: sess
    });
})

module.exports = router