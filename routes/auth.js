const router = require('express').Router();
const User = require('../models/User');
const auth = require('../controllers/auth');

router.post('/login', auth.login);

module.exports = router;