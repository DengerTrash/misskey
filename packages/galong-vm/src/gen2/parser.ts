import * as fs from "node:fs";
import * as ohm from 'npm:ohm-js'
import * as ohmExtra from 'npm:ohm-js/extras'
import { GalongToken } from "../../structures/GalongTokens.ts";

const ohmGramma = fetch('../../src/galong.ohm')
ohmGramma.catch(e => console.error('ohm error:',e))//new URL('./galong.ohm',import.meta.url),'utf-8')
const ohmGrammar = await ohmGramma.then(fe => fe.text());

//パーサーを使ってコードを解析します。
export function parser(moji: string) { //: Array<GalongToken>{
	const uuu = ohm.grammar(ohmGrammar)
	const uuuu = uuu.match(moji)
	return ohmExtra.toAST(uuuu,{
		AssignmentExpressionOrElision_elision: {

		},
		AssignmentExpression_assignment: {
			key: 0,
			value: 2
		},
		CallExpression_memberExpExp: {
			execute: 0,
			arguments: 1,
		},
		ConstStatement: {
			type: "Const",
			identifier: 1
		},
 		DefineStatement: {
			type: "Define",
			identifier: 1,
			value: 2
		},
		ExpressionStatement: {
			value: 0
		},
		ForeverStatement: {
			type: "Forever",
			execute: 1
		},
		FunctionBody: {
			type: 'Function',
			execute: 1
		},
		FunctionDeclaration: {
			identifier: 1,
			argument: 3,
			execute: 6
		},
		MemberExpression_propRefExp: {
			parent: 0,
			method: 2
		}
	})
}
