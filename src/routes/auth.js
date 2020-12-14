const express = require('express');
const { signup, sigin, requireSignin } = require('../controller/auth');
const router = express.Router();

router.post('/signin', sigin);
router.post('/signup', signup);

// router.post('/profile', requireSignin,(req, res) => {
//     res.status(200).json({
//         user: 'profile'
//     })
// })

module.exports = router;