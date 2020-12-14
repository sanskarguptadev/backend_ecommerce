const express = require('express');
const { signup, sigin, requireSignin } = require('../../controller/admin/auth');
const router = express.Router();

router.post('/admin/signin', sigin);
router.post('/admin/signup', signup);

module.exports = router;