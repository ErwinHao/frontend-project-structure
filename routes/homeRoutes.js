const router = require('express').Router();

const { getHomeView } = require('../controllers/homeController'); 

router.get('/', getHomeView);

module.exports = router;