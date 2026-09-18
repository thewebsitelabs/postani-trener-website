import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const ROOT = path.join(process.cwd(), 'dist');
const TYPES = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.json':'application/json'};
const exists = async p => { try { const s = await stat(p); return s.isFile(); } catch { return false; } };
http.createServer(async (req,res)=>{
  let p = decodeURIComponent(new URL(req.url,'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(ROOT, p);
  if (!(await exists(f)) && !path.extname(f)) {
    if (await exists(f + '.html')) f = f + '.html';
    else if (await exists(path.join(f,'index.html'))) f = path.join(f,'index.html');
  }
  if (!(await exists(f))) { res.writeHead(404,{'content-type':'text/plain'}); return res.end('404 ' + p); }
  const body = await readFile(f);
  res.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream','cache-control':'no-store'});
  res.end(body);
}).listen(4489, ()=>console.log('http://localhost:4489'));
