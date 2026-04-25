import { Hono, HonoRequest } from "hono";
import * as greet from './endpoints/greet.ts'
const Honoland = new Hono();
const gre = greet.default
Honoland.get(gre.path,(c) => c.text(gre.execute(c.req)))
interface EndpointObject {
	path: string;
	execute(req: HonoRequest): string
}
export function Endpoint(list: EndpointObject){
	return list;
}

export default Honoland;
