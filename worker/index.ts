interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    // Canonical redirect (soniclab.cc -> www.soniclab.cc)
    if (url.hostname === 'soniclab.cc') {
      const target = new URL(request.url);
      target.hostname = 'www.soniclab.cc';
      return Response.redirect(target.toString(), 301);
    }

    // Serve static assets
    try {
      let res = await env.ASSETS.fetch(request as any);

      // SPA fallback: if 404 and not a file extension, serve index.html
      if (res.status === 404) {
        const isFile = path.match(/\.[a-zA-Z0-9]+$/);
        if (!isFile) {
          res = await env.ASSETS.fetch(new URL('/index.html', request.url) as any);
        }
      }
      return res;
    } catch (e) {
      return new Response('Internal Error', { status: 500 });
    }
  },
};
