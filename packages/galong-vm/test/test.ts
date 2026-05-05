const bund = await Deno.bundle({
	entrypoints: [import.meta.resolve('../src/mod.ts')],
	outputPath: 'packages/galong-vm/test/.built/build.js',
	platform: "browser",
  //minify: true,
	write: true,
	format: 'esm'
});
console.log(bund.success)

async function handler(req: Request): Promise<Response> {
	const { pathname } = new URL(req.url);

	// こうでもしないとうまくいかないの
	const js = await Deno.readTextFile("packages/galong-vm/test/test.js");
	const bu = await Deno.readTextFile("packages/galong-vm/test/.built/build.js");
	const oh = await Deno.readTextFile("packages/galong-vm/src/galong.ohm");
	const ga = await Deno.readTextFile("packages/galong-vm/test/projects/min.gal");
	if (pathname.endsWith("test.js")) {
    return new Response(js, {
      headers: { "content-type": "text/javascript" },
    });
  }
	if (pathname.endsWith("build.js")) {
    return new Response(bu, {
      headers: { "content-type": "text/javascript" },
    });
  }
	if (pathname.endsWith(".ohm")) {
    return new Response(oh, {
      headers: { "content-type": "text/plain" },
    });
  }
	if (pathname.endsWith(".gal")) {
    return new Response(ga, {
      headers: { "content-type": "text/plain" },
    });
  }
  const html = await Deno.readTextFile("packages/galong-vm/test/test.html");
  const responseHeaders =
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    };
  return new Response(html, responseHeaders);
}

Deno.serve(handler);
