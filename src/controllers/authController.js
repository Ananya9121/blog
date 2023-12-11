const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const errorHandler = require('../utils/errorHandler');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorHandler.conflict(res, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorHandler.unauthorized(res, 'Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    errorHandler.internalServerError(res, error.message);
  }
}

module.exports = {
  register,
  login,
};
