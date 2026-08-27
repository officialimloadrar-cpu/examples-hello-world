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
    url.hostname = "ucplfdgpek1fobmmbmhp.supabase.co";
    url.protocol = "https:";
    url.port = "443";
    const newReq = new Request(url, req);
    newReq.headers.set("host", "ucplfdgpek1fobmmbmhp.supabase.co");
    const res = await fetch(newReq);
    const h = new Headers(res.headers);
    h.set("Access-Control-Allow-Origin", "*");
    h.set("Access-Control-Allow-Methods", "*");
    h.set("Access-Control-Allow-Headers", "*");
    return new Response(res.body, { status: res.status, headers: h });
  } catch (e) {
    return new Response(JSON.stringify({ proxyError: String(e) }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
