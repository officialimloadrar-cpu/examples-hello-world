Deno.serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, prefer, range, range-unit, x-supabase-api-version",
    "Access-Control-Expose-Headers": "content-range, apikey",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = new URL(req.url);
  const target = "https://ucplfdgpek1fobmmbmhp.supabase.co" + url.pathname + url.search;

  const headers = new Headers();
  headers.set("apikey", req.headers.get("apikey") || "");
  headers.set("Authorization", req.headers.get("Authorization") || req.headers.get("authorization") || "");
  headers.set("Content-Type", req.headers.get("Content-Type") || "application/json");
  headers.set("x-client-info", req.headers.get("x-client-info") || "");
  const prefer = req.headers.get("prefer");
  if (prefer) headers.set("prefer", prefer);

  const res = await fetch(target, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  const resHeaders = new Headers(res.headers);
  for (const [k, v] of Object.entries(cors)) resHeaders.set(k, v);

  return new Response(res.body, {
    status: res.status,
    headers: resHeaders,
  });
});
