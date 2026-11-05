// Real data: NFL 2026 regular season, from the SportRadar feed. Updated 2026-11-03.
const DATA_AS_OF="Nov 3, 2026";
const TEAMS={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAC:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};
const RECORDS={NYG:"4-2",WAS:"2-4",PHI:"2-6",DAL:"3-5",NO:"2-5",TB:"3-5",ATL:"3-5",CAR:"3-4",LA:"4-4",SEA:"4-4",ARI:"3-5",SF:"6-1",MIN:"6-1",CHI:"6-2",GB:"5-3",DET:"5-2",LAC:"0-7",KC:"5-2",LV:"4-4",DEN:"6-2",MIA:"1-6",NYJ:"2-6",BUF:"6-1",NE:"5-3",IND:"2-6",HOU:"2-5",TEN:"1-7",JAC:"5-2",CIN:"5-2",PIT:"6-2",CLE:"5-3",BAL:"4-4"};
// Upcoming games: [id, kickoff UTC, away, home, away win %, home win %, label]
const SLATE=[
 ["0335b50d","2026-11-06T01:15:00Z","JAC","BAL",82.3,17.7,"Thursday Night Football"],
 ["0123cfbf","2026-11-08T14:30:00Z","CIN","ATL",60,40,""],
 ["59de6442","2026-11-08T18:00:00Z","DAL","IND",69.5,30.5,""],
 ["5b7f1d2b","2026-11-08T18:00:00Z","LA","WAS",68.3,31.7,""],
 ["7aff506a","2026-11-08T18:00:00Z","CLE","NO",46.5,53.5,""],
 ["b4c8199a","2026-11-08T18:00:00Z","NYJ","KC",19.3,80.7,""],
 ["c183e3ee","2026-11-08T18:00:00Z","DET","MIA",73.8,26.2,""],
 ["e88605bc","2026-11-08T18:00:00Z","DEN","CAR",58.3,41.7,""],
 ["f7aa7dc3","2026-11-08T18:00:00Z","NYG","PHI",62.2,37.8,""],
 ["f345e4a0","2026-11-08T21:05:00Z","HOU","LAC",66.5,33.5,""],
 ["8030b23a","2026-11-08T21:25:00Z","LV","SF",null,null,""],
 ["a3020470","2026-11-08T21:25:00Z","GB","NE",null,null,""],
 ["a6953f89","2026-11-08T21:25:00Z","ARI","SEA",null,null,""],
 ["6654f093","2026-11-09T01:20:00Z","TB","CHI",null,null,"Sunday Night Football"],
 ["481bb9be","2026-11-10T01:15:00Z","BUF","MIN",null,null,"Monday Night Football"]
];
// Finals for slate games, filled in as they finish: id -> [away score, home score]
// ODDS: real sportsbook lines (DraftKings via ESPN), {idPrefix:[awayML, homeML, "spread", total]}. Overrides feed win odds when present.
const ODDS={
 "0335b50d":[-520,390,"JAC -10",40.5],
 "0123cfbf":[-162,136,"CIN -3",52.5],
 "59de6442":[-278,225,"DAL -6",51.5],
 "5b7f1d2b":[-245,200,"LA -5.5",47.5],
 "7aff506a":[100,-120,"NO -1.5",42.5],
 "b4c8199a":[370,-485,"KC -9.5",46.5],
 "c183e3ee":[-375,295,"DET -7",50.5],
 "e88605bc":[-142,120,"DEN -2.5",43.5],
 "f7aa7dc3":[-170,142,"NYG -3.5",39.5],
 "f345e4a0":[-205,170,"HOU -4.5",40.5],
 "8030b23a":[410,-550,"SF -10",52.5],
 "a3020470":[140,-166,"NE -3",46.5],
 "a6953f89":[440,-600,"SEA -10.5",41.5],
 "6654f093":[230,-285,"CHI -6",46.5],
 "481bb9be":[-180,150,"BUF -3.5",45.5]
};
// PARLAY: same-game parlay menus for featured games (primetime + one Sunday game), keyed by SLATE idPrefix.
// pass/rush/rec rows: [player, team, line, overOdds, underOdds]. td rows: [player, team, anytimeOdds, isCoverPrice(1 = no book line posted)].
// spreadOdds/totalOdds: [away/over, home/under]. Arrays are append-only once a game is published (picks reference row indexes).
const PARLAY={
 "0335b50d":{src:"Props and anytime TD: market-best prices via SportsBettingDime, Nov 5. Spread: DraftKings via VegasInsider. Moneyline and total: DraftKings via ESPN.",
  spreadOdds:[-108,-112], totalOdds:[-110,-110],
  pass:[["Trevor Lawrence","JAC",230.5,-115,-115],["Joe Fagnano","BAL",157.5,-115,-115]],
  rush:[["Bhayshul Tuten","JAC",67.5,-115,-115],["Chris Rodriguez Jr.","JAC",30.5,-115,-114],["Derrick Henry","BAL",70.5,-110,-120],["Justice Hill","BAL",13.5,-115,-115]],
  rec:[["Parker Washington","JAC",62.5,-115,-115],["Jakobi Meyers","JAC",38.5,-115,-115],["Bhayshul Tuten","JAC",12.5,-120,-110],["Zay Flowers","BAL",46.5,-115,-115],["Mark Andrews","BAL",19.5,-120,-110],["Justice Hill","BAL",13.5,-120,-110],["Derrick Henry","BAL",7.5,-110,-120]],
  td:[["Bhayshul Tuten","JAC",108],["Chris Rodriguez Jr.","JAC",113],["Parker Washington","JAC",156],["Brenton Strange","JAC",270],["Jakobi Meyers","JAC",355],["Travis Hunter","JAC",809],
      ["Brian Thomas Jr.","JAC",600,1],["Trevor Lawrence","JAC",900,1],["Ameer Abdullah","JAC",900,1],["LeQuint Allen Jr.","JAC",1200,1],["Nate Boerkircher","JAC",1200,1],["Tanner Koziol","JAC",1500,1],["Josh Cameron","JAC",1500,1],
      ["Derrick Henry","BAL",144],["Zay Flowers","BAL",400],["Justice Hill","BAL",525],["Mark Andrews","BAL",567],["Ja'Kobi Lane","BAL",733],["Rashod Bateman","BAL",900],
      ["Rasheen Ali","BAL",1000,1],["Joe Fagnano","BAL",1000,1],["Josh Cuevas","BAL",1500,1],["Matt Hibner","BAL",2000,1]]}
};
// PARLAY_RES: graded player lines after the game, {idPrefix:{stats:{"Player":{pass,rush,rec,td}}, out:["Player who did not play"]}}
const PARLAY_RES={};
const RESULTS={};
// Completed games this season: [date, away, home, away score, home score, label]
const PAST=[
 ["2026-09-10","SF","LA",27,7,"Thursday Night"],["2026-09-13","GB","MIN",22,39,""],["2026-09-13","BUF","HOU",36,31,""],["2026-09-13","ATL","PIT",13,20,""],
 ["2026-09-13","DAL","NYG",20,28,"Sunday Night"],["2026-09-13","TB","CIN",27,33,""],["2026-09-14","DEN","KC",10,31,"Monday Night"],["2026-09-17","DET","BUF",31,41,"Thursday Night"],
 ["2026-09-20","MIN","CHI",9,3,""],["2026-09-20","IND","KC",30,33,"Sunday Night"],["2026-09-20","MIA","SF",13,35,""],["2026-09-20","PIT","NE",3,20,""],
 ["2026-09-20","WAS","DAL",20,37,""],["2026-09-20","CIN","HOU",20,6,""],["2026-09-27","MIN","TB",23,16,""],["2026-09-27","KC","MIA",24,10,""],
 ["2026-09-27","LAC","BUF",16,24,""],["2026-09-27","ARI","SF",30,36,""],["2026-09-27","CIN","PIT",27,30,""],["2026-09-27","BAL","DAL",34,31,""],
 ["2026-10-01","PIT","CLE",24,27,"Thursday Night"],["2026-10-04","MIA","MIN",10,15,""],["2026-10-04","KC","LV",30,27,""],["2026-10-04","NE","BUF",29,26,""],
 ["2026-10-04","DEN","SF",14,24,""],["2026-10-04","DAL","HOU",34,30,""],["2026-10-04","JAC","CIN",22,17,""],["2026-10-08","TB","DAL",24,16,"Thursday Night"],
 ["2026-10-11","MIN","NO",23,13,""],["2026-10-11","SF","SEA",32,29,""],["2026-10-11","IND","PIT",22,34,""],["2026-10-11","CIN","MIA",31,24,""],
 ["2026-10-12","BUF","LA",37,34,"Monday Night"],["2026-10-18","LAC","KC",6,22,""],["2026-10-18","BUF","LV",33,30,""],["2026-10-18","PIT","TB",26,19,""],
 ["2026-10-18","DAL","GB",13,23,"Sunday Night"],["2026-10-19","WAS","SF",17,23,"Monday Night"],["2026-10-25","NYG","HOU",27,21,""],["2026-10-25","DEN","ARI",30,16,""],
 ["2026-10-25","LA","LV",35,21,""],["2026-10-25","GB","DET",17,20,""],["2026-10-25","KC","SEA",3,20,"Sunday Night"],["2026-10-25","SF","ATL",20,29,""],
 ["2026-10-25","PIT","NO",16,10,""],["2026-10-25","IND","MIN",10,16,""],["2026-10-25","CIN","BAL",35,13,""],["2026-10-26","DAL","PHI",38,21,"Monday Night"],
 ["2026-10-29","CAR","GB",19,27,"Thursday Night"],["2026-11-01","IND","JAC",7,42,""],["2026-11-01","TEN","CIN",36,43,""],["2026-11-01","CLE","PIT",6,27,""],
 ["2026-11-01","MIN","DET",15,19,""],["2026-11-01","ATL","TB",0,16,""],["2026-11-01","ARI","DAL",33,30,""],["2026-11-01","LV","NYJ",38,33,""],
 ["2026-11-01","BAL","BUF",10,36,""],["2026-11-01","LAC","LA",9,24,""],["2026-11-01","NE","MIA",24,19,""],["2026-11-01","KC","DEN",24,28,""],
 ["2026-11-01","PHI","WAS",10,27,"Sunday Night"],["2026-11-02","CHI","SEA",34,17,"Monday Night"]
];

