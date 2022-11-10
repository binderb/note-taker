const express = require('express');
const notes_router = require('./notes');

const app = express();
app.use('/notes',notes_router);

module.exports = app;