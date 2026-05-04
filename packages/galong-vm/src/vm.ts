import { parser } from "./parser.ts";
import * as fs from "node:fs";

const unti = fetch('../min.gal')//new URL('../test/min.gal',import.meta.url),'utf-8')
unti.catch(e => console.error('unti error:',e))//new URL('./galong.ohm',import.meta.url),'utf-8')
const unko = await unti.then(fe => fe.text());
function vm(code: string){
	const parse:Array<any> = Object.values(parser(code))
	console.log(parse)
	/**

	for (const a of parse){
		for (const b of a){
			if(typeof b === "object"){
				console.log(Object.entries(b))
			}
		}
	}
	*/
}

//vm(unko)
