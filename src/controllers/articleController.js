const Article = require('../models/article.model');
const errorHandler = require('../utils/errorHandler');

async function getAllArticles(req, res) {
  try {
    const articles = await Article.find().populate('author', 'username');

    res.status(200).json(articles);
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

async function getArticleById(req, res) {
  try {
    const { articleId } = req.params;

    const article = await Article.findById(articleId).populate('author', 'username');

    if (!article) {
      return errorHandler.notFound(res, 'Article not found');
    }

    res.status(200).json(article);
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

async function createArticle(req, res) {
  try {
    const { title, content } = req.body;
    const { userId } = req.user;

    const newArticle = new Article({
      title,
      content,
      author: userId,
    });

    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

async function editArticle(req, res) {
  try {
    const { articleId } = req.params;
    const { title, content } = req.body;
    const { userId } = req.user;

    const article = await Article.findById(articleId);

    if (!article) {
      return errorHandler.notFound(res, 'Article not found');
    }

    if (article.author.toString() !== userId) {
      return errorHandler.forbidden(res, 'You do not have permission to edit this article');
    }

    article.title = title;
    article.content = content;

    await article.save();

    res.status(200).json({ message: 'Article updated successfully' });
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

async function deleteArticle(req, res) {
  try {
    const { articleId } = req.params;
    const { userId } = req.user;

    const article = await Article.findById(articleId);

    if (!article) {
      return errorHandler.notFound(res, 'Article not found');
    }

    if (article.author.toString() !== userId) {
      return errorHandler.forbidden(res, 'You do not have permission to delete this article');
    }

    await article.remove();

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  editArticle,
  deleteArticle,
};
