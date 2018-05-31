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
        let i = 0;
        matches.forEach((match)=>{
            let winner = match.winner;
            let season = match.season;
            if(wonPerSeason[season][winner] == undefined) 
                wonPerSeason[season][winner] = 0;
            wonPerSeason[season][winner]++;
            if(i==(len-1)) callback(wonPerSeason);
            i++;
        });

        // for(let i = 0; i < len; i++){
        //     let winner = matches[i].winner;
        //     let season = matches[i].season;
        //     if(wonPerSeason[season][winner] == undefined) 
        //         wonPerSeason[season][winner] = 0;
        //     wonPerSeason[season][winner]++;
        //     if(i==(len-1)) callback(wonPerSeason);
        // }
    });
}

function getExtraPerTeam(season, ModelMatch, ModelDeliveries,callback) {
    let extraPerTeam = {};
    let matchIds = [];
    let matchesRemaining;
    let deliveriesRemaining;
    function updateExtraPerTeam(err, deliveries) {
        let numberDeliveries = deliveries.length;
        deliveriesRemaining = numberDeliveries;
        matchesRemaining--;
        deliveries.forEach((delivery)=>{
            let bowlingTeam = delivery.bowling_team;
            if(extraPerTeam[bowlingTeam]==undefined)
             extraPerTeam[bowlingTeam] = 0;
            let extraRuns = delivery.extra_runs;
            extraPerTeam[bowlingTeam] = extraPerTeam[bowlingTeam]+extraRuns;
            deliveriesRemaining--;
            if(!matchesRemaining && !deliveriesRemaining) callback(extraPerTeam);
        });
        // for(let j=0; j<numberDeliveries; j++) {
        //    let bowlingTeam = deliveries[j].bowling_team;
        //    if(extraPerTeam[bowlingTeam]==undefined)
        //     extraPerTeam[bowlingTeam] = 0;
        //    let extraRuns = deliveries[j].extra_runs;
        //    extraPerTeam[bowlingTeam] = extraPerTeam[bowlingTeam]+extraRuns;
        //    deliveriesRemaining--;
        //    if(!matchesRemaining && !deliveriesRemaining) callback(extraPerTeam);
        // }
    }
    ModelMatch.find({season: season}, (err, matches) => {
       let totalMatches = matches.length;
       matchesRemaining = totalMatches;
       matches.forEach((match)=>{
        matchIds.push(match.id);
       });
    //    for(let i=0; i<totalMatches; i++){
    //        matchIds.push(matches[i].id);
    //    }
    matchIds.forEach((matchId)=>{
        ModelDeliveries.find({match_id: matchId},updateExtraPerTeam);
    });
    //    for(let i=0; i<totalMatches; i++){
    //        ModelDeliveries.find({match_id: matchIds[i]},updateExtraPerTeam);
    //    }
    });
}

function getEconomicalBowler(season, ModelMatch, ModelDeliveries, callback)  {
    let econBowler = {};
    let matchIds = [];
    let matchesRemaining;
    let deliveriesRemaining;
    function updateEconBowler(err, deliveries) {
        let numberDeliveries = deliveries.length;
        deliveriesRemaining = numberDeliveries;
        matchesRemaining--;
        deliveries.forEach((delivery)=>{
            let bowler = delivery.bowler;
            let totalRuns = delivery.total_runs;
            let wideRuns = delivery.wide_runs;
            let noballRuns = delivery.noball_runs;
            if(econBowler[bowler]==undefined)
              econBowler[bowler] = {runsConceded : 0, ballsBowled : 0};
            econBowler[bowler].runsConceded = econBowler[bowler].runsConceded + totalRuns;
            if(!wideRuns && !noballRuns)
              econBowler[bowler].ballsBowled++;
           deliveriesRemaining--;
           if(!matchesRemaining && !deliveriesRemaining) calcEconBowler();
        });
        // for(let j=0; j<numberDeliveries; j++) {
        //     let bowler = deliveries[j].bowler;
        //     let totalRuns = deliveries[j].total_runs;
        //     let wideRuns = deliveries[j].wide_runs;
        //     let noballRuns = deliveries[j].noball_runs;
        //     if(econBowler[bowler]==undefined)
        //       econBowler[bowler] = {runsConceded : 0, ballsBowled : 0};
        //     econBowler[bowler].runsConceded = econBowler[bowler].runsConceded + totalRuns;
        //     if(!wideRuns && !noballRuns)
        //       econBowler[bowler].ballsBowled++;
        //    deliveriesRemaining--;
        //    if(!matchesRemaining && !deliveriesRemaining) calcEconBowler();
        // }
    }
    ModelMatch.find({season: season}, (err, matches) => {
        let totalMatches = matches.length;
        matchesRemaining = totalMatches;
        matches.forEach((match)=>{
            matchIds.push(match.id);
        });
        // for(let i=0; i<totalMatches; i++){
        //     matchIds.push(matches[i].id);
        // }
        matchIds.forEach((matchId)=>{
            ModelDeliveries.find({match_id: matchId}, updateEconBowler);
        });
        // for(let i=0; i<totalMatches; i++){
        //     ModelDeliveries.find({match_id: matchIds[i]},updateEconBowler);
        // }
    });
    function calcEconBowler() {
        let bowlers = Object.keys(econBowler);
        bowlers.forEach((bowler)=>{
            let oversBowled = (econBowler[bowler].ballsBowled)/6;
            let economy = (econBowler[bowler].runsConceded)/oversBowled;
            econBowler[bowler] = economy;
        });
        callback(econBowler);
    }
}

module.exports.getMatchPerSeason = getMatchPerSeason;
module.exports.getWonPerSeason = getWonPerSeason;
module.exports.getExtraPerTeam = getExtraPerTeam;
module.exports.getEconomicalBowler = getEconomicalBowler;