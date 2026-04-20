export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Helper to add CORS
    const addCors = (res: Response) => {
      const newHeaders = new Headers(res.headers);
      newHeaders.set('Access-Control-Allow-Origin', request.headers.get('Origin') || '*');
      newHeaders.set('Access-Control-Allow-Credentials', 'true');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: newHeaders });
    };

    // Static assets (favicon, robots.txt, sitemap.xml) — strip any path prefix
    const assetMatch = path.match(/^\/wareki\/(favicon\.svg|robots\.txt|sitemap\.xml)$/);
    if (assetMatch) {
      const newUrl = new URL(url.toString());
      newUrl.pathname = `/${assetMatch[1]}`;
      const assetReq = new Request(newUrl, request);
      const res = await env.ASSETS.fetch(assetReq as any);
      return addCors(res);
    }

    // SPA / Static files
    try {
      let res = await env.ASSETS.fetch(request as any);

      if (res.status === 404) {
        // Not a file (no extension), serve index.html for SPA routing
        const isAsset = path.startsWith('/wareki/assets/') || path.match(/\.[a-zA-Z0-9]+$/);
        if (!isAsset) {
          res = await env.ASSETS.fetch(new URL('/index.html', url.origin) as any);
        }
      }
      return addCors(res);
    } catch (e) {
      return new Response('Internal Error', { status: 500 });
    }
  },
};
