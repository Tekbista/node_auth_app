const express = require('express')
const router = express.Router()

const { loadLoginPage, loadSignupPage, createUser, authenticateUser } = require('../controller/user.controller.js')

router.get('/login', loadLoginPage);
router.get('/signup', loadSignupPage);
router.post('/signup', createUser);
router.post('/login', authenticateUser);

module.exports = router