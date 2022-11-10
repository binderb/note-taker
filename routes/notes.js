const notes = require('express').Router();
const fs = require('fs');

notes.get('/', async (req, res) => {
  fs.readFile('./db/db.json',(err,db) => {
    res.json(JSON.parse(db));
  });
});

module.exports = notes;