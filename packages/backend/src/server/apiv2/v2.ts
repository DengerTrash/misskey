import { Hono } from "hono";

import * as yaml from 'js-yaml';

import { promises as fsp } from 'fs';

import * as endpoints from './mod.ts';
import { Honoland, type EndpointObject } from "./EndpointObject.ts";
import { ServerService } from "../ServerService.ts";

interface HonolandInitOption {
	serverService?: ServerService
}

const url = process.env.NODE_ENV === 'development' ? (yaml.load(await fsp.readFile('../../../../.config/default.yml', 'utf-8')) as any).url : null;
console.log(url)
export default function initHonoland(config: HonolandInitOption): Honoland{
	const hr = new Honoland();

	/**下のディレクトリを全部調べるぞおじさん「下のディレクトリを全部調べるぞ」 */
	for (const [name, module] of Object.entries(endpoints)) {
        const def = module as EndpointObject;
        if (def?.path) {
            hr.get(def.path, (c) => {
                const result = def?.execute(c);
                if (typeof result === 'object') {
                    return c.json(result);
                }
                return c.text('something error!');
            });
        }
    }
	return hr;
}
export function Endpoint(list: EndpointObject){
	return list;
}

// TODO: execute→GET,POST,PATCH,DELETE
