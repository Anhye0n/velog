const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./user/index', {'user': user});
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

router.get('/user/my_info', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./user/my_info', {'user': user});
})

// contents views
router.get('/contents/portfolio', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./contents/portfolio', {'user': user});
})

router.get('/contents/all_article', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./contents/all_article', {'user': user});
})

router.get('/contents/all_categories', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./contents/all_categories', {'user': user});
})

router.get('/contents/site_info', (req, res) => {
    //session에 담긴 user정보
    //req로 접근 가능
    let user = req.user;
    res.render('./contents/site_info', {'user': user});
})

module.exports = router