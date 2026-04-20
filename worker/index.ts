export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/wareki/, '');

    // Redirect to pages.dev (strip /wareki prefix)
    const target = `https://soniclab-wareki.pages.dev${path}${url.search}`;
    return Response.redirect(target, 302);
  },
};
