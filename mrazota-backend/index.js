const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use(cors());

 

require('dotenv').config();

const getComments = require('./getComments');
const createComments = require('./CreateComments');

app.get('/comments', getComments);
app.post('/comments', createComments);

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server started ${SERVER_URL}${PORT}`);
});
