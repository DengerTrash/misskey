import { Hono } from "hono";

import * as supabase from '@supabase/supabase-js'
import * as endpoints from './mod.ts';
import { Honoland, type EndpointObject } from "./EndpointObject.ts";
import type { Config } from "../../config.ts";
//import { ServerService } from "../ServerService.ts";

interface HonolandInitOption {
	configYml: Config
}

export default function initHonoland(config: HonolandInitOption): Honoland{
	const hr = new Honoland();
	/**下のディレクトリを全部調べるぞおじさん「下のディレクトリを全部調べるぞ」 */
	for (const [name, module] of Object.entries(endpoints)) {
    const def = module as EndpointObject;
    if (def?.path) {
			def.core = hr;
			if(def.get){
				hr.get(def.path, (c) => {
					const result = def?.execute(c);
					//if (typeof result === 'object') return c.json(result);
					return c.text('something error!');
				});
			}
			if(def?.POST){
				hr.post(def.path, (c) => {
					const result = def?.POST(c);
					if (typeof result === 'object') {
						return c.json(result);
					}
					return c.text('unko');
				});
			}
    }
  };
	const yml = config.configYml
	if(yml.supabase){
		hr.supabase = supabase.createClient(
			yml.supabase?.url,
			yml.supabase?.key
		)
	} else {
		console.error('Supabase init failed.');
		console.error('You cannot use Gen2 API.');
	}


	return hr;
}
export function Endpoint(list: EndpointObject){
	return list;
}

// TODO: execute→GET,POST,PATCH,DELETE
