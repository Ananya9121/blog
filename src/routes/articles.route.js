// routes/articles.js

const express = require('express');
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate);

router.get('/', articleController.getAllArticles);
router.get('/:articleId', articleController.getArticleById);
router.post('/', validateMiddleware.validateArticle, articleController.createArticle);
router.put('/:articleId', validateMiddleware.validateArticle, articleController.editArticle);
router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;
