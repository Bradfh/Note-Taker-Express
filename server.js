// Initial dependency and module imports, followed by PORT setup, Express app setup, and middleware setup
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');


const PORT = process.env.PORT || 3001;

const app = express();


//Middleware. /api is telling the app to use our api variable from above to handle any routes that start with /api (as defined in the frontend JS).
// When express.static() is used it creates a new folder called public and makes it static. This means that the files inside of it can be accessed by the browser without a route.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);