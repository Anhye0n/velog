const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./user/index');
})

router.get('/admin/auto_increment_reset', (req, res) => {

    res.render('./admin/auto_increment_reset');
})
router.get('/admin/decrypto_test', (req, res) => {

    res.render('./admin/decrypto_test');
})

module.exports = router