import {Hono} from '$hono'
const app = new Hono()
app.get("/", (c) => c.json({msg: 'unko'}))
Deno.serve({port: 8081}, app.fetch)
