Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      }
    });
  }
  const url = new URL(req.url);
  const targetUrl = "https://ucplfdgpek1fobmmbmhp.supabase.co" + url.pathname + url.search;
  const newReq = new Request(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? await req.arrayBuffer() : undefined,
  });
  const res = await fetch(newReq);
  const newRes = new Response(res.body, res);
  newRes.headers.set("Access-Control-Allow-Origin", "*");
  newRes.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  newRes.headers.set("Access-Control-Allow-Headers", "*");
  return newRes;
});
