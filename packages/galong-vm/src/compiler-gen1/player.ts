import { GalongRenderer } from "../../../galong-render/src/mod.ts"
import { GalongVM } from "../mod.ts"
import compiler from "./compile.ts";
import { parser } from "./parser.ts";


const unti = fetch('../projects2/min.gal')//new URL('../test/min.gal',import.meta.url),'utf-8')
unti.catch(e => console.error('unti error:',e))//new URL('./galong.ohm',import.meta.url),'utf-8')
const unko = await unti.then(fe => fe.text());
const unkoParsed = compiler(parser(unko))

export class GalongPlayer {

	readonly di: HTMLCanvasElement
	readonly rend: GalongRenderer
	readonly vm: GalongVM
	/**
	 * Galong自体を動かす場合に必要です。
	 * @param div
	 */
	constructor(div: HTMLCanvasElement){
		this.di = div
		this.rend = new GalongRenderer(this,this.di)
		this.vm = new GalongVM(this)
	}
	resize(){
		this.rend.resize()
	}
	async bang(){
		await this.rend.init()
		const cococo = this.vm.executeCompiler(unkoParsed)
	}
}
