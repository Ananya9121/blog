// middleware/validateMiddleware.js

const Joi = require('joi');
const errorHandler = require('../utils/errorHandler');

function validateRegistration(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorHandler.handleJoiError(res, error);
  }

  next();
}

function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorHandler.handleJoiError(res, error);
  }

  next();
}

function validateArticle(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
console.log("line 40");
  const { error } = schema.validate(req.body);
  if (error) {
    return errorHandler.handleJoiError(res, error);
  }

  next();
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateArticle,
};
