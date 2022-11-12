const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
  // Read the "database" file and return the JSON array inside.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    if (!err) {
      res.status(200).json(JSON.parse(db));
    } else {
      res.status(500).json(err);
    }
  });
});

notes.post('/', (req, res) => {
  // Generate a new id for the incoming note.
  const new_id = uuidv4();
  // Read the JSON "database" file and parse it.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    if (!err) {
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
        err ? console.error(err) : console.info('save success');
      });
      // Return the new note as part of the response.
      // (From what I can tell, the app doesn't do anything with this,
      // but it was part of the acceptance criteria.)
      const response = {
        status: 'success',
        body: new_note
      };
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting new note.');
    }
  });
});

notes.delete('/:id', (req, res) => {
  const note_id = req.params.id;
  // Read the JSON "database" file and parse it.
  fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
    if (!err) {
      const db_json = JSON.parse(db);
      // Filter the list so that it no longer includes
      // the chosen note.
      const new_db = db_json.filter(e => e.id !== note_id);
      // Write the modified array to the "database" file.
      fs.writeFile('./db/db.json',JSON.stringify(new_db), (err) => {
        err ? console.error(err) : console.info('delete success');
      });
      // Return the new "database" JSON array as part of the response.
      // (From what I can tell, the app doesn't do anything with this,
      // but I designed this in an analogous way to the POST request
      // for consistency.)
      const response = {
        status: 'success',
        body: new_db
      };
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in deleting note.');
    }
  });
});

module.exports = notes;