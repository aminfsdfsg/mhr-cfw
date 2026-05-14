export default {
  async fetch(request) {
    try {
      const body = await request.json();

      const url = body.u;
      const method = body.m || "GET";
      const headers = body.h || {};
      const redirect = body.r === false ? "manual" : "follow";

      const options = {
        method,
        headers,
        redirect
      };

      if (body.b) {
        options.body = body.b;
      }

      const resp = await fetch(url, options);

      const text = await resp.text();

      return Response.json({
        s: resp.status,
        h: Object.fromEntries(resp.headers),
        b: text
      });

    } catch (e) {
      return Response.json({
        e: String(e)
      }, { status: 500 });
    }
  }
}
