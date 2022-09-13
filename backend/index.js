const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const events = require('./routes/events');

global.__basedir = __dirname;

const port = 8080;

// Middlewear
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/events', events);

app.listen(port, () => console.log(`Listening on ${port}`));
