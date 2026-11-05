import json, subprocess, random
src=open("questions2.js").read()
O=json.loads(subprocess.run(["node","-e","const s=require('fs').readFileSync('questions2.js','utf8');console.log(JSON.stringify(new Function(s+';return QUESTIONS')()))"],capture_output=True,text=True).stdout)
KEEP_UPTO=10   # days 0-1 (Nov 3-4) already played; new format starts Nov 5
N=[]
def add(d,g,**q): q["_d"]=d; q["_g"]=g; N.append(q)
W8="through Week 8"
# ---- Season Leaders ----
add(1,"lead-rec",k="lead",q="Through Week 8, who leads the NFL in receiving yards?",o=["CeeDee Lamb","Jaxon Smith-Njigba","Tee Higgins","Puka Nacua"],a=1,f="Jaxon Smith-Njigba: 985 yards and 9 TDs on 64 catches. Next up is Tee Higgins with 726.")
add(2,"lead-rush",k="lead",q="Through Week 8, who leads the NFL in rushing yards?",o=["Jahmyr Gibbs","Kenneth Walker III","Bijan Robinson","James Cook III"],a=2,f="Bijan Robinson, 780. Gibbs has 773 and Walker 770. Ten yards separate the top three.")
add(2,"lead-rtd",k="lead",q="Through Week 8, who leads the NFL in rushing touchdowns?",o=["Derrick Henry","D'Andre Swift","Jahmyr Gibbs","Jonathan Taylor"],a=1,f="D'Andre Swift with 10. Henry, Gibbs and Taylor each have 8.")
# ---- league Defense ----
add(2,"def-lead",k="defense",q="Through Week 8, which two players share the NFL sack lead?",o=["Chase Young & Greg Rousseau","T.J. Watt & Will Anderson Jr.","Aidan Hutchinson & Dallas Turner","Andrew Van Ginkel & Jacob Martin"],a=1,f="T.J. Watt and Will Anderson Jr. at 7.5. Chase Young and Greg Rousseau are right behind at 7.")
add(1,"def-young",k="defense",q="Which of these pass rushers has the most sacks through Week 8?",o=["Aidan Hutchinson","Dexter Lawrence II","Chase Young","Quinnen Williams"],a=2,f="Chase Young, 7. The other three have 5 apiece.")
add(2,"def-min",k="defense",q="Which team has TWO top-10 sack leaders through Week 8?",o=["Vikings","Steelers","Texans","Bills"],a=0,f="Minnesota: Andrew Van Ginkel (6.5) and Dallas Turner (6.0).")
# ---- Standings ----
add(1,"st-61",k="stand",q="Which of these teams is 6-1?",o=["Chiefs","Ravens","Bills","Eagles"],a=2,f="Buffalo 6-1. Kansas City is 5-2, Baltimore 4-4, Philadelphia 2-6.")
add(1,"st-nfcn",k="stand",q="NFC North check: which team is 6-1?",o=["Bears","Vikings","Lions","Packers"],a=1,f="Minnesota 6-1. Chicago 6-2, Detroit 5-2, Green Bay 5-3. Best division in football.")
add(1,"st-afcw",k="stand",q="Which AFC West team is 6-2?",o=["Chiefs","Raiders","Chargers","Broncos"],a=3,f="Denver 6-2. Kansas City 5-2, Las Vegas 4-4, the Chargers 0-7.")
add(1,"st-winless",k="stand",q="Which team is still winless through Week 8?",o=["Dolphins","Titans","Chargers","Jets"],a=2,f="The Chargers, 0-7. Miami is 1-6 and Tennessee 1-7.")
add(3,"st-count",k="stand",q="How many teams are 6-1 or 6-2 through Week 8?",o=["4","5","6","7"],a=2,f="Six: Bills, 49ers and Vikings at 6-1; Broncos, Steelers and Bears at 6-2.")
add(2,"st-win",k="stand",q="Which of these teams has a winning record?",o=["Cowboys","Falcons","Browns","Colts"],a=2,f="Cleveland, 5-3. Dallas and Atlanta are 3-5, Indy 2-6.")
# ---- Season Duel ----
add(2,"sd-henry",k="sduel",q="More rushing yards this season: Derrick Henry or Jonathan Taylor?",o=["Derrick Henry","Jonathan Taylor"],a=0,f="Henry 632, Taylor 610. Both have 8 rushing TDs.")
add(2,"sd-lamb",k="sduel",q="More receiving yards this season: CeeDee Lamb or Christian Watson?",o=["Christian Watson","CeeDee Lamb"],a=1,f="Lamb 709, Watson 708. One. Yard.")
add(2,"sd-mcb",k="sduel",q="More catches this season: Trey McBride or Jaxon Smith-Njigba?",o=["Trey McBride","Jaxon Smith-Njigba"],a=0,f="McBride 66, JSN 64. JSN has way more yards though (985 to 544).")
add(2,"sd-irv",k="sduel",q="More rushing yards this season: Bucky Irving or James Cook III?",o=["James Cook III","Bucky Irving"],a=1,f="Irving 728, Cook 707 (in one fewer game).")
add(2,"sd-watt",k="sduel",q="More sacks this season: T.J. Watt or Greg Rousseau?",o=["T.J. Watt","Greg Rousseau"],a=0,f="Watt 7.5, Rousseau 7.")
add(2,"sd-nab",k="sduel",q="More receiving yards this season: Malik Nabers or Zay Flowers?",o=["Malik Nabers","Zay Flowers"],a=1,f="Flowers 608, Nabers 605.")
add(3,"sd-long",k="sduel",q="Longer catch this season: Jaxon Smith-Njigba or Christian Watson?",o=["Christian Watson","Jaxon Smith-Njigba"],a=1,f="JSN 82 yards, Watson 81.")
add(2,"sd-jav",k="sduel",q="More rushing TDs this season: Javonte Williams or Kenneth Walker III?",o=["Javonte Williams","Kenneth Walker III"],a=0,f="Javonte 8, Walker 6.")
# ---- Season Over/Under ----
add(1,"so-jsn",k="sou",q="Jaxon Smith-Njigba receiving yards through Week 8: over or under 899.5?",o=["Over","Under"],a=0,f="Over. 985.")
add(1,"so-bij",k="sou",q="Bijan Robinson rushing yards through Week 8: over or under 750.5?",o=["Over","Under"],a=0,f="Over. 780, tops in the league.")
add(2,"so-puka",k="sou",q="Puka Nacua catches through Week 8 (he's played 6 games): over or under 50.5?",o=["Over","Under"],a=0,f="Over. 56 catches in 6 games.")
add(2,"so-swift",k="sou",q="D'Andre Swift rushing TDs through Week 8: over or under 8.5?",o=["Over","Under"],a=0,f="Over. 10, the most in the NFL.")
add(2,"so-henry",k="sou",q="Derrick Henry rushing yards through Week 8: over or under 675.5?",o=["Over","Under"],a=1,f="Under. 632 yards, with 8 TDs.")
add(1,"so-anderson",k="sou",q="Will Anderson Jr. sacks through Week 8: over or under 6.5?",o=["Over","Under"],a=0,f="Over. 7.5, tied for the NFL lead.")
# ---- Season Stat (generous scoring) ----
add(3,"ss-jsn",k="sstat",q="How many receiving yards does Jaxon Smith-Njigba have through Week 8?",ans=985,tol=250,unit="yards",f="985, on 64 catches with 9 TDs.")
add(3,"ss-gibbs",k="sstat",q="How many rushing yards does Jahmyr Gibbs have through Week 8 (7 games)?",ans=773,tol=200,unit="yards",f="773, with 8 rushing TDs.")
add(3,"ss-mcb",k="sstat",q="How many catches does Trey McBride have through Week 8?",ans=66,tol=18,unit="catches",f="66, the most in the NFL among the top receivers.")
add(3,"ss-watt",k="sstat",q="How many sacks does T.J. Watt have through Week 8?",ans=7.5,tol=3.5,unit="sacks",f="7.5, tied for the league lead.")
add(3,"ss-higgins",k="sstat",q="How many receiving yards does Tee Higgins have through Week 8 (7 games)?",ans=726,tol=200,unit="yards",f="726, second in the NFL.")
add(3,"ss-walk",k="sstat",q="Kenneth Walker III's longest run this season?",ans=76,tol=25,unit="yards",f="76 yards. He's at 770 rushing yards through Week 8.")

# ---- carry over the good ones from the old bank, convert/drop the too-hard ones ----
def rng(q,ans,fg=False):
    if fg: opts=["Under 40","40–49","50–54","55+"]; a=0 if ans<40 else 1 if ans<50 else 2 if ans<55 else 3
    else: opts=["Under 20","20–39","40–59","60+"]; a=0 if ans<20 else 1 if ans<40 else 2 if ans<60 else 3
    return {"k":"long","q":q["q"],"o":opts,"a":a,"f":q["f"]}
kept=[]
for i,q in enumerate(O[KEEP_UPTO:],start=KEEP_UPTO):
    k=q["k"]; txt=q["q"]; low=txt.lower()
    g="old%d"%i
    if k=="defense": continue                                   # single-game defense: too hard
    if k=="duel" and ("tackle" in low or "sack" in low): continue
    if k=="closest" and "tackle" in low: continue
    if k=="long" and "ans" in q:
        fg="field goal" in low
        q_f=q["f"]
        kept.append(dict(rng(q,q["ans"],fg),_d=2,_g=g)); continue
    d={"match":1,"cap":3 if "Two are real" in txt and "Week" in txt else 2,"scored":2,"duel":2,"ou":2,"closest":3,"fact":1}.get(k,2)
    if k=="closest": q=dict(q,tol=max(q["tol"],round(q["ans"]*0.35)))   # more forgiving
    kept.append(dict(q,_d=d,_g=g))
ALL=N+kept
print("new",len(N),"kept",len(kept),"total",len(ALL))
# ---- arrange: each day 2 easy, 2 medium, 2 hard; 6 different categories; no repeat game ----
random.seed(11)
pool={1:[],2:[],3:[]}
for q in ALL: pool[q["_d"]].append(q)
for v in pool.values(): random.shuffle(v)
days=[]
def take(d,cats,games):
    for lvl in ([d]+[x for x in (2,1,3) if x!=d]):
        for j,q in enumerate(pool[lvl]):
            if q["k"] not in cats and q["_g"] not in games:
                return pool[lvl].pop(j)
    for lvl in (1,2,3):
        if pool[lvl]: return pool[lvl].pop(0)
    return None
while sum(len(v) for v in pool.values())>=6:
    day=[];cats=set();games=set()
    for d in (1,1,2,2,3,3):
        q=take(d,cats,games)
        if not q: break
        day.append(q);cats.add(q["k"]);games.add(q["_g"])
    if len(day)<6: break
    day.sort(key=lambda q:q["_d"]); days.append(day)
left=[q for v in pool.values() for q in v]
flat=[q for d in days for q in d]+left
for q in flat: q.pop("_d",None); q.pop("_g",None)
final=O[:KEEP_UPTO]+flat
for i,q in enumerate(final):
    if "ans" in q: assert q["tol"]>0
    else: assert 0<=q["a"]<len(q["o"]),(i,q)
head=src[:src.index("const QUESTIONS=")]
tail=src[src.index("\n// ===== Conversion banks"):]
body="const QUESTIONS=[\n"+",\n".join(" "+json.dumps(q,ensure_ascii=False) for q in final)+"\n];\n"
open("questions2.js","w").write(head+body+tail)
print("days built",len(days),"leftover",len(left),"bank",len(final))
for n,d in enumerate(days[:4]): print("Nov",6+n,[q["k"] for q in d])
