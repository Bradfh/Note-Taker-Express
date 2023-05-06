const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

router.get('/', (req, res) => 
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);

    const response = {
      status: 'success',
      body: newNote,
    };
    
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = router;