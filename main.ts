Deno.serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, prefer, range, range-unit, x-supabase-api-version",
    "Access-Control-Expose-Headers": "content-range",
  };
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  const url = new URL(req.url);
  const target = "https://ucplfdgpek1fobmmbmhp.supabase.co" + url.pathname + url.search;
  
  const headers = new Headers();
  const apikey = req.headers.get("apikey");
  const auth = req.headers.get("Authorization") || req.headers.get("authorization");
  if (apikey) headers.set("apikey", apikey);
  if (auth) headers.set("Authorization", auth);
  headers.set("Content-Type", "application/json");
  const xinfo = req.headers.get("x-client-info");
  if (xinfo) headers.set("x-client-info", xinfo);
  const prefer = req.headers.get("prefer");
  if (prefer) headers.set("prefer", prefer);

  const res = await fetch(target, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  const resHeaders = new Headers(res.headers);
  Object.entries(cors).forEach(([k,v]) => resHeaders.set(k,v));
  return new Response(res.body, { status: res.status, headers: resHeaders });
});
