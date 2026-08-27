Deno.serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  };
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  try {
    const url = new URL(req.url);
    const targetUrl = `https://ucplfdgpeklfobmmbmhp.supabase.co${url.pathname}${url.search}`;
    const headers = new Headers();
    for (const [k, v] of req.headers.entries()) {
      if (k.toLowerCase() === "host") continue;
      headers.set(k, v);
    }
    const res = await fetch(targetUrl, { method: req.method, headers, body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined });
    const resHeaders = new Headers(res.headers);
    resHeaders.set("Access-Control-Allow-Origin", "*");
    resHeaders.set("Access-Control-Allow-Methods", "*");
    resHeaders.set("Access-Control-Allow-Headers", "*");
    return new Response(res.body, { status: res.status, headers: resHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ proxyError: String(e) }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
