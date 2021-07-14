const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let user = req.user
    res.render('./admin/index', {'user': user});
})

router.get('/auto_increment_reset', (req, res) => {
    let user = req.user

    res.render('./admin/auto_increment_reset', {'user': user});
})
router.get('/decrypto_test', (req, res) => {
    let user = req.user

    res.render('./admin/decrypto_test', {'user': user});
})

module.exports = router