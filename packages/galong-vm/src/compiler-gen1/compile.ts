import { CallExpressionGalongToken, GalongToken } from "../../structures/GalongTokens.ts";
import { parser } from "./parser.ts";

const defineScript = function(identifier: string){
	return `
parents.vm.sprites.set("Cube",new assets.GalongSprite(
	parents,
	parents.rend.scenes[0],
	crypto.randomUUID()
))
`;
};

const functionScript = function(
	identifier: string,
	argument: Array<string>,
	exec: string
){
	return `
function ${identifier}(${argument.toString()}){
	${exec}
}
`
};

const foreverScript = function(
	exec: string
){
	// 暫定的にコードをそのまま返す方法に変更
	return exec;
};

const expressionScript = function(
	code: CallExpressionGalongToken
){
	const {execute} = code
	return`
${execute.parent}.${execute.method}(${code.arguments.join()})
`
};
export default function compiler(code: Array<GalongToken>){
	const result: Array<string> = [];
	const core = function(cod: GalongToken): Array<string> {
		const res = [];
		switch(cod.type){
			case "Empty": {
				break;
			}
			case "Define":{
				res.push(defineScript(
					cod.identifier,
				))
				break;
			}
			case "Function":{
				const execu = []
				for (const coco of cod.execute.execute) execu.push(core(coco));
				res.push(functionScript(
					cod.identifier,
					cod.arguments,
					execu.join()
				))
				break;
			}
			case "Forever":{
				const execu = []
				for (const coco of cod.execute) execu.push(core(coco));
				res.push(foreverScript(
					execu.join('')
				))
				break;
			}
			case "Expression":{
				res.push(expressionScript(cod.value))
				break;
			}
			case "AssignmentExpression":
			case "CallExpression":
		}
		return res;
	}
	for(const cod of code){
		result.push(core(cod).join(''))
	}
	return result.join('');
}
