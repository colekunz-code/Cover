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
