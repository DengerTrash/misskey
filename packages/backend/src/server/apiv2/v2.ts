import { type Context, Hono } from "hono";
import type { BlankInput } from 'hono/types'
import * as fs from 'node:fs'
import * as path from 'node:path'

import { fileURLToPath } from 'url';

export default function initHonoland(){
	const Honoland = new Hono();

	/**下のディレクトリを全部調べるぞおじさん「下のディレクトリを全部調べるぞ」 */
	const readSubDirSync = (folderPath: string):Array<string> => {
    let result: Array<string> = [];
    const readTopDirSync = ((folderPath: string) => {
      let items = fs.readdirSync(folderPath);
      items = items.map((itemName) => {
        return path.join(folderPath, itemName);
      });
      items.forEach((itemPath) => {
        result.push(itemPath);
        if (fs.statSync(itemPath).isDirectory()) {
          readTopDirSync(itemPath);
          //再帰処理
        }
      });
    });
    readTopDirSync(folderPath);
    return result;
  };
	const dirparth = path.join(fileURLToPath(import.meta.url),'../',path.relative(fileURLToPath(import.meta.url),'./backend/src/server/apiv2/endpoints'))
	const endpoints = readSubDirSync(dirparth)

	console.log(endpoints)
	for (const endpoint of endpoints){
		const tess = fs.statSync(endpoint);
		if(!tess.isDirectory()){
			const aaaa = import(endpoint).then(aaa => {
				console.log(aaa)
				if(aaa?.default){
					const {default: def} = aaa
					Honoland.get(def?.path,(c) => {
						const result = def.execute(c)
						if(typeof result === 'object'){
							return c.json(result)
						}
						return c.text('something error!')
					})
				}
			})
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
