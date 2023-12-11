const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.route');
const articleRoutes = require('./routes/articles.route');
require('dotenv').config();
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

const mongoURI=process.env.mongoURI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// enable cors
app.use(cors());
app.options("*", cors());

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
