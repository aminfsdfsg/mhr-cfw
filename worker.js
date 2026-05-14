export default {
  async fetch(request) {
    try {
      const body = await request.json();

      const url = body.u;
      const method = body.m || "GET";
      const headers = body.h || {};

      const resp = await fetch(url, {
        method,
        headers,
        body: body.b || undefined,
        redirect: body.r === false ? "manual" : "follow"
      });

      const arr = await resp.arrayBuffer();

      let binary = "";
      const bytes = new Uint8Array(arr);

      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      const b64 = btoa(binary);

      return Response.json({
        s: resp.status,
        h: Object.fromEntries(resp.headers),
        b: b64
      });

    } catch (e) {
      return Response.json({
        e: String(e)
      }, { status: 500 });
    }
  }
}
