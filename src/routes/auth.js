const express = require('express');
const { signup, sigin } = require('../controller/auth');
const router = express.Router();

router.post('/signin', sigin);
router.post('/signup', signup);

module.exports = router;