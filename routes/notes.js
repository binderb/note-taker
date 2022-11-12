const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

notes.get('/', async (req, res) => {
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    res.json(JSON.parse(db));
  });
});

notes.post('/', (req, res) => {
  // Generate a new id for the incoming note.
  const new_id = uuid();
  // Read the JSON "database" file and parse it.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    const db_json = JSON.parse(db);
    const { title, text } = req.body;
    const new_note = {
      id : new_id,
      title : title,
      text : text
    }
    db_json.push(new_note);
    fs.writeFile('./db/db.json',JSON.stringify(db_json), (err) => {
      res.send(err ? err : 'save success');
    });
  });
});

module.exports = notes;