import { Hono } from "$hono";
import type { MedilandConfig } from "./MedilandConfig.ts";

export class Mediland {
	private includeHono: Hono;
	constructor(
		private config: MedilandConfig,
	){
		this.includeHono = new Hono({
		})
	};
	async fire(){
		Deno.serve(this.includeHono.fetch)
	}
};
