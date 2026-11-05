const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
await p.route('**/supabase.js',r=>r.fulfill({body:'',contentType:'text/javascript'}));
await p.clock.install({time:new Date('2026-11-05T08:00:00-06:00')});
await p.goto('file://'+process.cwd()+'/'+(process.argv[2]||'site/index.html'));
await p.click('#hGo');await p.click('#go');
for(let i=0;i<5;i++){const ws=await p.$$('.wager:not([disabled])');await ws[ws.length-1].click();await p.waitForTimeout(200);
 const info=await p.evaluate(()=>{const c=document.querySelector('#daily .card');const r=c.getBoundingClientRect();const over=[...c.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>r.right+1).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right));return {vw:innerWidth,sw:document.documentElement.scrollWidth,card:Math.round(r.right),over:over.slice(0,4),focus:document.activeElement.className}});
 console.log(i,JSON.stringify(info));
 if(i===2) await p.screenshot({path:'mob_q.png'});
 if(await p.$('#nv')){await p.fill('#nv','20');await p.click('#nf button');}else{(await p.$$('.opt'))[0].click();}
 await p.waitForSelector('#nx');await p.click('#nx');}
await b.close();})();
