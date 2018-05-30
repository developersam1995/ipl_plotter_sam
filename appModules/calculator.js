function getMatchPerSeason(startSeason, endSeason, ModelMatch, callback) {
    let getMatchPerSeason = [];
    for(let i = startSeason; i < endSeason; i++){
        ModelMatch.count({season: i}, (err, count)=>{
            let modelObj = {season: i, matches: count};
            matchPerSeason.push(modelObj);
            if(i==(endSeason-1)) callback(matchPerSeason);
        });
    }
}

module.exports.getMatchPerSeason = getMatchPerSeason;