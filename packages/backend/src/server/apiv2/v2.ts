import { type Context, Hono } from "hono";
import type { BlankInput } from 'hono/types'

import * as endpoints from './mod.ts';

export default function initHonoland(){
	const Honoland = new Hono();

	/**下のディレクトリを全部調べるぞおじさん「下のディレクトリを全部調べるぞ」 */
	for (const [name, module] of Object.entries(endpoints)) {
        const def = module as EndpointObject;
        if (def?.path) {
            Honoland.get(def.path, (c) => {
                const result = def.execute(c);
                if (typeof result === 'object') {
                    return c.json(result);
                }
                return c.text('something error!');
            });
        }
    }
	return Honoland;
}
interface EndpointObject {
	path: string;
	execute(req?: Context<{}, "/", BlankInput>): unknown
}
export function Endpoint(list: EndpointObject){
	return list;
}

// TODO: execute→GET,POST,PATCH,DELETE
