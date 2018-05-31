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
       wonPerSeason[i] = {};
    }
    ModelMatch.find({}, function (err, matches) {
        let len = matches.length;
        for(let i = 0; i < len; i++){
            let winner = matches[i].winner;
            let season = matches[i].season;
            if(wonPerSeason[season][winner] == undefined) 
                wonPerSeason[season][winner] = 0;
            wonPerSeason[season][winner]++;
            if(i==(len-1)) callback(wonPerSeason);
        }
    });
}

function getExtraPerTeam(season, ModelMatch, ModelDeliveries,callback) {
    let extraPerTeam = {};
    let matchIds = [];
    function updateExtraPerTeam(err, deliveries) {
        let numberDeliveries = deliveries.length;
        for(let j=0; j<numberDeliveries; j++) {
           let bowlingTeam = deliveries[j].bowling_team;
           if(extraPerTeam[bowlingTeam]==undefined)
            extraPerTeam[bowlingTeam] = 0;
           let extraRuns = deliveries[j].extra_runs;
           extraPerTeam[bowlingTeam] = extraPerTeam[bowlingTeam]+extraRuns;
        }
    }
    ModelMatch.find({season: season}, (err, matches) => {
       let totalMatches = matches.length;
       for(let i=0; i<totalMatches; i++){
           matchIds.push(matches[i].id);
       }
       for(let i=0; i<totalMatches; i++){
           ModelDeliveries.find({match_id: matchIds[i]},updateExtraPerTeam);
       }
    });
    setTimeout(()=>{console.log(extraPerTeam)},10000);
}

module.exports.getMatchPerSeason = getMatchPerSeason;
module.exports.getWonPerSeason = getWonPerSeason;
module.exports.getExtraPerTeam = getExtraPerTeam;