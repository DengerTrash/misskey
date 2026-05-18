import {
	ExpressionGalongToken,
	GalongToken
} from "../../structures/GalongTokens.ts";


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
	return `
parents.rend.scenes[0].onBeforeRenderObservable.add(() => {
	${exec}
});
`
};

const expressionScript = function(
	code: ExpressionGalongToken
){
	if(code?.value.type === "AssignmentExpression"){
		const valueMapped = code.value.value.filter(ma => typeof ma === 'string')
		return `${code.value.key}: [ ${valueMapped.toString()} ]`
	};
	if(code?.value.type === "CallExpression"){

		const {execute} = code.value
		return`${execute.parent}.${execute.method}(${code.value.arguments.join()})`
	}
};
export default class GalongCompiler {
	data: object;
	constructor(){
		this.data = {}
	}
	defineScript(identifier: string, value: Array<GalongToken>){
		const valueData = []
		console.log('value:',value)
		for(const valu of value){
			valueData.push(this.core(valu))
			/**

			if(valu.type === "Expression"){
				if(valu.value.type === "AssignmentExpression"){
					if(valu.value.key === "on_start"){
						this.data.on
					}
				}
			}
			*/
		}
	return `
parents.vm.sprites.set("${identifier}",new assets.GalongSprite(
	parents,
	parents.rend.scenes[0],
	crypto.randomUUID(),
	{
		${valueData.toString()}
	}
))
`;
	};
	core(cod: GalongToken): Array<string | undefined>{
		console.log('core:',cod)
		const res = [];
		switch(cod.type){
			case "Empty": {
				break;
			}
			case "Define":{
				res.push(this.defineScript(
					cod.identifier,
					cod.value
				))
				break;
			}
			case "Function":{
				const execu = []
				for (const coco of cod.execute.execute) execu.push(this.core(coco));
				res.push(functionScript(
					cod.identifier,
					cod.arguments,
					execu.join()
				))
				break;
			}
			case "Forever":{
				const execu = []
				for (const coco of cod.execute) execu.push(this.core(coco));
				res.push(foreverScript(
					execu.join('')
				))
				break;
			}
			case "Expression":{
				res.push(expressionScript(cod))
				break;
			}
			case "AssignmentExpression":
			case "CallExpression":
		}
		return res;
	}
	compile(code: Array<GalongToken>): compilerResult {
		const result: Array<string> = [];


		for(const cod of code){
			result.push(this.core(cod).join(''))
		}
		return {
			code: result.join(''),
			data: this.data
		};
	}
}
interface compilerResult {
	code: string;
	data: {
		onStartFunctions?: Array<string>;
	}
}
