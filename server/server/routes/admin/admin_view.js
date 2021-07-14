const express = require('express');
const router = express.Router();

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

module.exports = router