function getMatchPerSeason(startSeason, endSeason, ModelMatch, callback) {
    let matchPerSeason = {};
    for(let i = startSeason; i < endSeason; i++){
        ModelMatch.count({season: i}, (err, count) => {
            matchPerSeason[i]=count;
            if(i==(endSeason-1)) callback(matchPerSeason);
        });
    }
}

function getWonPerSeason(startSeason, endSeason, ModelMatch, callback) {
    let wonPerSeason = {};
    for(let i = startSeason; i < endSeason; i++){
       
    }
    function updateWonPerSeason(winner, season){
      
    }
    ModelMatch.find({}, function (err, matches) {
        let len = matches.length;
        for(let i = 0; i < len; i++){
            let winner = matches[i].winner;
            let season = matches[i].season;
            updateWonPerSeason(winner, season);
            if(i==(len-1)) callback(wonPerSeason);
        }
    });
}

module.exports.getMatchPerSeason = getMatchPerSeason;
module.exports.getWonPerSeason = getWonPerSeason;