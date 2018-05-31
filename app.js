const express = require('express');
const updateData = require('./appModules/updateData');
const fs = require('fs');

const app = express();

// updateData();

app.use(express.static('./public'));

app.get('/plotter', (req, res) => {
  res.sendfile('./index.html');
});

app.get('/plotter/:id', (req, res) => {
  let dataId = req.params.id;
  if (dataId == 1) {
    fs.readFile('./appData/matchPerSeason.json', 'utf8', (err, data) => {
      res.json(data);
    });
  }
  else if (dataId == 2) {
    fs.readFile('./appData/wonPerSeason.json', 'utf8', (err, data) => {
      res.json(data);
    });
  }
  else if (dataId == 3) {
    res.json([1, 2, 3]);
  }
  else if (dataId == 4) {
    res.json([1, 2, 3]);
  }
  else if (dataId == 5) {
    res.json([1, 2, 3]);
  }
  else res.sendStatus(404);
});

app.listen(3000);
console.log('listening at 3000');

