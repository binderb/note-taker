const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid') ;

notes.get('/', (req, res) => {
  // Read the "database" file and return the JSON array inside.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    res.json(JSON.parse(db));
  });
});

notes.post('/', (req, res) => {
  // Generate a new id for the incoming note.
  const new_id = uuidv4();
  // Read the JSON "database" file and parse it.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    const db_json = JSON.parse(db);
    const { title, text } = req.body;
    // Build a note object containing the new id.
    const new_note = {
      id : new_id,
      title : title,
      text : text
    }
    // Append the new note the end of the database JSON array.
    db_json.push(new_note);
    // Write the modified array to the "database" file.
    fs.writeFile('./db/db.json',JSON.stringify(db_json), (err) => {
      res.send(err ? err : 'save success');
    });
  });
});

module.exports = notes;