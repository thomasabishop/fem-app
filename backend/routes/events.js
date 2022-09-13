const express = require('express');
const router = express.Router();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// This routing module returns the 'event.txt' data as an API endpoint

router.use(cors());

const parseEventFile = async (filePath) => {
  const eventFile = fs.readFileSync(filePath);
  const asCsv = eventFile.toString();
  return new Promise((resolve) => {
    Papa.parse(asCsv, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
    // Add error handling
  });
};

router.get('/', (req, res) => {
  parseEventFile(__basedir + '/data/event.txt').then((data) => {
    res.send(data);
  });
});

module.exports = router;
