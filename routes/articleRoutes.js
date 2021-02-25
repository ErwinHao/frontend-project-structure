const router = require('express').Router();

const { getArticleDetail, getCreateArticle } = require('../controllers/articleController')

router.get('/create-article', getCreateArticle);
router.get('/article-detail', getArticleDetail);

module.exports = router;