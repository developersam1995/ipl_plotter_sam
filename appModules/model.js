const mongoose = require('mongoose');

const DeliveriesSchema = new mongoose.Schema({
  match_id: Number,
  inning: Number,
  batting_team: String,
  bowling_team: String,
  over: Number,
  ball: Number,
  batsman: String,
  non_striker: String,
  bowler: String,
  is_super_over: Number,
  wide_runs: Number,
  bye_runs: Number,
  legbye_runs: Number,
  noball_runs: Number,
  penalty_runs: Number,
  batsman_runs: Number,
  extra_runs: Number,
  total_runs: Number,
  player_dismissed: String,
  dismissal_kind: String,
  fielder: String
});

const MatchSchema = new mongoose.Schema({
    id: Number,
    season: Number,
    city: String,
    date: String,
    team1: String,
    team2: String,
    toss_winner: String,
    toss_decision: String,
    result: String,
    dl_applied: Number,
    winner: String,
    win_by_runs: Number,
    win_by_wickets: Number,
    player_of_match: String,
    venue: String,
    umpire1: String,
    umpire2: String,
    umpire3: String
});



module.exports.ModelDeliveries = mongoose.model('deliveries', DeliveriesSchema);
module.exports.ModelMatch = mongoose.model('matches', MatchSchema);