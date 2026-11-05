const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;
for(let day=5;day<=24;day++){const p=await b.newPage({viewport:{width:390,height:844}});const e=[];p.on('pageerror',x=>e.push(x.message));
 await p.route('**/supabase.js',r=>r.fulfill({body:'',contentType:'text/javascript'}));
 await p.clock.install({time:new Date(Date.UTC(2026,10,day,18))});await p.goto('file://'+process.cwd()+'/site/index.html');
 await p.click('#hGo');await p.click('#go');let n=0;
 while(await p.$('.wager')){const ws=await p.$$('.wager:not([disabled])');await ws[0].click();if(await p.$('#nv')){await p.fill('#nv','20');await p.click('#nf button');}else{(await p.$$('.opt'))[0].click();}await p.waitForSelector('#nx');await p.click('#nx');n++;}
 let c='';if(await p.$('#cvTwo')){await p.click(day%2?'#cvTwo':'#cvPat');(await p.$$('.opt'))[0].click();await p.waitForSelector('#nx');await p.click('#nx');c=day%2?'two':'pat';}
 const ok=!!(await p.$('.summary .total')); if(!ok||e.length) bad++;
 process.stdout.write(day+':'+n+(c?'+'+c:'')+(ok?'':'!NODONE')+(e.length?'!ERR '+e[0]:'')+'  ');await p.close();}
console.log('\nproblems:',bad);await b.close();})();
