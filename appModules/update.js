// //assumption database is updated each year

// const mongoose = require('mongoose');
// const model = require('./model');
// const fs = require('fs');
// const StatsCalculator = require('./statsCalculator').StatsCalculator; 

// const ModelDeleveries = model.ModelDeleveries;
// const ModelMatch = model.ModelMatch;
// const startSeason = 2008;
// let calcSeasonSoFar;
// const endSeason = (new Date()).getFullYear();

// mongoose.connect('mongodb://localhost/ipl');

// let db = mongoose.connection;

// db.once('open', () => {
//     console.log('Mongo active');
// });

// let calculator = new StatsCalculator(startSeason, endSeason, ModelMatch, ModelDeleveries);

// calculator.getMatchPerSeason((mps)=>{
//     createJsonFile(mps, 'matchPerSeason');
// });

// function createJsonFile(jsonObject,fileName){
//     let stringified = JSON.stringify(jsonObject);
//     fs.writeFile(`./jsonFiles/${fileName}.json`, stringified, (err) => {
//         if (err) console.log(err);
//         else console.log('Created Json file');
//     });
// };

