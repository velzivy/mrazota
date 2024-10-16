const express = require('express');
const path = require('path');
const cors = require('cors');
const events = require('events');

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use(cors());

const emitter = new events.EventEmitter()

require('dotenv').config();

const getComments = require('./getComments');
const createComments = require('./CreateComments');
const db = require('./db');

app.get('/comments', getComments);
app.post('/comments', createComments);

app.get('/chatmessages', (req, res) => {
  const messageListener = (messageData) => {

      res.json(messageData);
  };

  emitter.once('newMessage', messageListener);

  req.on('close', () => {
      emitter.removeListener('newMessage', messageListener);
  });
});


app.post('/chatmessages', async (req, res) => {

  const {name, message} = req.body;

  const query = 'INSERT INTO chatcomments (name, text, date) VALUES ($1, $2, NOW()) RETURNING *'
  
  const data = await db.query(query, [name, message])
  
  emitter.emit('newMessage', data.rows[0])
  res.status(200).send();
});

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server started ${SERVER_URL}${PORT}`);
});
