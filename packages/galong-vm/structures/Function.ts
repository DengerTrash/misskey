import { GalongVM } from "../src/mod.ts";
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
		execute: Array<any>
	){
		this.VM = vm;
		this.name = name;
		this.args = args;
		this.executes = execute;

	}
	execute(sprite: GalongSprite,...args: any){
		//this.VM.execute(this.executes)
		sprite.rotate(0,9,0)
	}
}
