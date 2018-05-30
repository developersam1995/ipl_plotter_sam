function update() {
  const mongoose = require('mongoose');
  const fs = require('fs');
  const model = require('./model');
  const calculator = require('./calculator');

  const ModelDeleveries = model.ModelDeleveries;
  const ModelMatch = model.ModelMatch;
  const startSeason = 2008;
  const endSeason = (new Date()).getFullYear();

  function createJsonFile(jsonObject,fileName){
    let stringified = JSON.stringify(jsonObject);
    fs.writeFile(`./appData/${fileName}.json`, stringified, (err) => {
        if (err) console.log(err);
        else console.log(`Created JSON file ${fileName}.json in appData`);
    });
  };

  mongoose.connect('mongodb://localhost/ipl');

  let db = mongoose.connection;

  db.once('open', () => {
    console.log('Mongo active');
  });

  calculator.getMatchPerSeason(startSeason, endSeason, ModelMatch,(mps)=>{
    createJsonFile(mps, 'matchPerSeason');
  });

  
}

module.exports = update;