import os
E=lambda k,d="": os.environ.get(k,d)
SITE=E("SITE_URL","https://colekunz-code.github.io/Cover/")
t=open("cover2_tpl.html").read(); d=open("data_block.js").read(); q=open("questions2.js").read()
body=t.replace("%%DATA%%",d).replace("%%QUESTIONS%%",q)
body=body.replace("Sign in to Claude to join the leaderboard. Your progress still saves on this device.","The leaderboard is offline right now. Your progress still saves on this device.")
body=body.replace('<p class="foot" id="foot"></p>','<p class="foot" id="foot"></p>\n  <p class="foot"><a href="terms.html">Terms &amp; privacy</a> · Free to play, ages 13+. No real money, no real bets.</p>')
i=body.index("<style>"); headbits=body[:i]; rest=body[i:]
shim=open("site_shim.js").read()
for k,v in {"%%SB_URL%%":E("SB_URL"),"%%SB_KEY%%":E("SB_KEY"),"%%TS_KEY%%":E("TS_KEY"),"%%GC_CODE%%":E("GC_CODE"),"%%SITE_URL%%":SITE}.items(): shim=shim.replace(k,v)
og=SITE+"og.png"
doc=('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
 '<meta name="description" content="The daily NFL ball-knowledge game. Five rounds, 30 seconds each. Wager +100 to +500 on what you know. Free to play.">\n'
 '<meta property="og:type" content="website"><meta property="og:url" content="'+SITE+'">\n'
 '<meta property="og:title" content="Cover · Daily NFL ball knowledge"><meta property="og:description" content="Five rounds. 30 seconds each. Wager on what you know. Can you beat me?">\n'
 '<meta property="og:image" content="'+og+'"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">\n'
 '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+og+'">\n'
 '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏈</text></svg>">\n'
 +headbits+
 '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/dist/umd/supabase.js"></script>\n<script>\n'+shim+'</script>\n'
 '</head>\n<body>\n'+rest+'\n</body>\n</html>\n')
open("site/index.html","w").write(doc); print("ok",len(doc))
