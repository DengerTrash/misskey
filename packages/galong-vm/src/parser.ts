import * as fs from "node:fs";
import * as ohm from 'npm:ohm-js'
import * as ohmExtra from 'npm:ohm-js/extras'
const ohmGramma = fetch('../../src/galong.ohm')
ohmGramma.catch(e => console.error('ohm error:',e))//new URL('./galong.ohm',import.meta.url),'utf-8')
const ohmGrammar = await ohmGramma.then(fe => fe.text());
export function parser(moji: string){
	const uuu = ohm.grammar(ohmGrammar)
	const uuuu = uuu.match(moji)
	return ohmExtra.toAST(uuuu,{
 		DefineStatement: {
			type: "DefineStatement",
			identifier: 1,
			body: 2
		},
		ConstStatement: {
			identifier: 1
		},

	})
}
