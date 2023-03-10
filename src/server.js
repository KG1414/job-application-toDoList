require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api_routes = require('./routes/api');
const { getDatabase } = require('./db/Mongo');

const app = express();
const port = process.env.PORT || 8088;
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

getDatabase().then(db => {
  console.log("DB ready.");
}).catch(err => console.log("DB error", err));

app.use('/api', api_routes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(`Listening to port ${port} for API.`);
app.listen(port);


