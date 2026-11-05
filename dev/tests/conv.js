const {chromium,devices}=require('playwright');const fs=require('fs');const [PAT_Q,TWO_Q]=new Function(fs.readFileSync('conv_bank.js','utf8')+';return [PAT_Q,TWO_Q]')();
async function play(b,date,choice,right,dev){
 const ctx=await b.newContext(dev?{...devices['iPhone 13']}:{viewport:{width:1280,height:900}});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
 await p.route('**/supabase.js',r=>r.fulfill({body:'',contentType:'text/javascript'}));
 await p.clock.install({time:new Date(date)});await p.goto('file://'+process.cwd()+'/site/index.html');
 await p.click('#hGo');await p.click('#go');let n=0;
 while(await p.$('.wager')){ const ws=await p.$$('.wager:not([disabled])'); if(n===0) console.log('  wagers:',(await p.$$eval('.wager',x=>x.map(y=>y.textContent))).join(' ')); await ws[ws.length-1].click();
  if(await p.$('#nv')){await p.fill('#nv','20');await p.click('#nf button');}else{(await p.$$('.opt'))[0].click();}
  await p.waitForSelector('#nx');n++; const lbl=await p.textContent('#nx'); await p.click('#nx'); }
 let conv=null;
 if(await p.$('#cvTwo')){ if(n===6&&dev) await p.screenshot({path:'conv_choice.png'}); await p.click(choice==="two"?'#cvTwo':'#cvPat');
   const ci=Math.round((new Date(date.slice(0,10)+'T12:00:00')-new Date('2026-11-06T12:00:00'))/864e5); const qa=(choice==='two'?TWO_Q:PAT_Q)[ci].a;
   const opts=await p.$$('.opt'); const idx=right?qa:(qa===0?1:0); await opts[idx].click(); await p.waitForSelector('#nx');
   if(dev) await p.screenshot({path:'conv_reveal_'+choice+'.png'});
   conv=(await p.textContent('.payout')).replace(/\s+/g,' '); await p.click('#nx'); }
 const tot=(await p.textContent('.summary .total')).trim(); const sq=await p.textContent('.squares');
 const saved=await p.evaluate(()=>{const d=JSON.parse(localStorage.getItem('cover-me')).days;const k=Object.keys(d).pop();return d[k].length});
 console.log(date.slice(0,10),'rounds',n,'| conv',choice,right?'right':'wrong','|',conv,'| total',tot,'|',sq,'| saved',saved,'| w',await p.evaluate(()=>document.documentElement.scrollWidth+'/'+innerWidth),'| errors',e);
 if(dev&&choice==="two"&&right) await p.screenshot({path:'conv_done.png'});
 await ctx.close();
}
(async()=>{const b=await chromium.launch();
await play(b,'2026-11-05T12:00:00-06:00','two',true,false);
await play(b,'2026-11-06T12:00:00-06:00','two',true,true);
await play(b,'2026-11-06T12:00:00-06:00','two',false,false);
await play(b,'2026-11-07T12:00:00-06:00','pat',true,true);
await play(b,'2026-11-08T12:00:00-06:00','pat',false,false);
await b.close();})();
