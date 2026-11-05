def build(admin):
    t=open("cover2_tpl.html").read(); d=open("data_block.js").read(); q=open("questions2.js").read()
    if not admin: return t.replace("%%DATA%%",d).replace("%%QUESTIONS%%",q)
    o=t.replace("%%DATA%%",open("admin_pre.js").read()+d+"\n"+open("admin_post.js").read()).replace("%%QUESTIONS%%",q)
    i=o.rindex("})();\n</script>"); o=o[:i]+open("admin_panel.js").read()+"\n"+o[i:]
    return o.replace("<title>Cover</title>","<title>Cover Admin</title>")
W=lambda o:'<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"></head><body>'+o+'</body></html>'
c=build(False); open("cover.html","w").write(c); open("test.html","w").write(W(c))
a=build(True); open("admin.html","w").write(a); open("admin_test.html","w").write(W(a))
