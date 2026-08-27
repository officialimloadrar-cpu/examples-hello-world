Deno.serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, prefer, range, content-range, x-supabase-api-version",
    "Access-Control-Expose-Headers": "content-range, content-length",
  };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  const url = new URL(req.url);
  const targetUrl = `https://ucplfdgpeklfobmmbmhp.supabase.co${url.pathname}${url.search}`;
  const headers = new Headers();
  for (const [k,v] of req.headers.entries()) {
    if (["host","connection"].includes(k.toLowerCase())) continue;
    headers.set(k,v);
  }
  const res = await fetch(targetUrl, { method: req.method, headers, body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined });
  const resHeaders = new Headers(res.headers);
  Object.entries(cors).forEach(([k,v]) => resHeaders.set(k,v));
  return new Response(res.body, { status: res.status, headers: resHeaders });
});
