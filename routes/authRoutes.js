const router = require('express').Router();

const { getLoginView, postLogin } = require('../controllers/authController');

router.get('/login', getLoginView);
router.post('/login', postLogin);

module.exports = router;