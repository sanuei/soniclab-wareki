export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Redirect to latest pages.dev deployment
    const target = `https://cccddb23.soniclab-wareki.pages.dev${path}${url.search}`;
    return Response.redirect(target, 302);
  },
};
