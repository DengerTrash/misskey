import * as fs from "node:fs";
import * as ohm from 'npm:ohm-js'
import * as ohmExtra from 'npm:ohm-js/extras'
import { GalongToken } from "../../structures/GalongTokens.ts";

const ohmGramma = fetch(new URL('galong.ohm',import.meta.url))
ohmGramma.catch(e => console.error('ohm error:',e))//new URL('./galong.ohm',import.meta.url),'utf-8')
const ohmGrammar = await ohmGramma.then(fe => fe.text());

interface ExpectedToASTReturn {
	0: Array<unknown>;
	1: Array<object>;
	type: "Program";
}
//パーサーを使ってコードを解析します。
export function parser(moji: string): Array<GalongToken>{
	const uuu = ohm.grammar(ohmGrammar)
	const uuuu = uuu.match(moji)
	console.log(uuuu?.message!)
	const ast = ohmExtra.toAST(uuuu,{
		AssignmentExpressionOrElision_elision: {

		},
		AssignmentExpression_assignment: {
			type: "AssignmentExpression",
			key: 0,
			value: 2
		},
		CallExpression_memberExpExp: {
			type: 'CallExpression',
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
		DefineTail_alt1: {
			data: 2
		},
		EmptyStatement: {
			type: "Empty"
		},
		ExpressionStatement: {
			type: "Expression",
			value: 0
		},
		ForeverStatement: {
			type: "Forever",
			execute: 1
		},
		FunctionBody: {
			execute: 1
		},
		FunctionDeclaration: {
			type: 'Function',
			identifier: 1,
			arguments: 3,
			execute: 6
		},
		MemberExpression_propRefExp: {
			parent: 0,
			method: 2
		},
		MethodDefinition_alt1: {
			class: 2,
			method: 0,
			execute: 5
		}
	}) as ExpectedToASTReturn;
	const result = ast[1] as Array<GalongToken>;
	return result; //new Array<GalongToken>;
}
