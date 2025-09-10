const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

const app = express();


app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


module.exports = app;