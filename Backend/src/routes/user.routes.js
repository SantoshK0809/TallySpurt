const express = require('express');
const { handleUserLogin } = require('../controller/user.auth.controller');
const router = express();

router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

module.exports = router