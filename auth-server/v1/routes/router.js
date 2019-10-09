const router = require('express').Router()
const v1Controller = require('../controllers/authentication')

router
    .route('/auth/register')
    .post(v1Controller.register);

router
    .route('/auth/login')
    .post(v1Controller.login);

module.exports = router
