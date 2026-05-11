import { GalongVM } from "../src/mod.ts";
import { GalongToken } from "./GalongTokens.ts";
import { GalongSprite } from "./sprite.ts";

export class GalongFunction {
	readonly VM: GalongVM;
	readonly name: string;
	readonly args: Array<string>;
	readonly executes: Array<any>;
	constructor(
		vm: GalongVM,
		name: string,
		args: Array<string>,
		execute: Array<GalongToken>
	){
		this.VM = vm;
		this.name = name;
		this.args = args;
		this.executes = execute;

	}
	execute(sprite: GalongSprite, ...args: any){
		console.log('called')
		let arg: Map<string,unknown> | undefined;
		if(args){
			arg = new Map<string,unknown>();
			/**残余引数！？知らねーよボケ！ */
			let i = 0;
			for(const aa of args){
				arg.set(this.args[i],aa)
				i++;
			}
		}
		console.log('let,',arg)
		//await this.VM.execute(this.executes,sprite,arg)
		//console.log('sssss')
		//sprite.rotatePerSecond(0,9,0)
	}
}
