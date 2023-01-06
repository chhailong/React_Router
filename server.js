const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Parse application/json
app.use(bodyParser.json());

// serve "public" folder as starting point for static asset
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.listen(3333, () => {
    console.log('Server is running on port 3333');
});