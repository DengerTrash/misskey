import { GalongRenderer } from "../../galong-render/src/mod.ts"

export class GalongPlayer {

	readonly di: HTMLCanvasElement
	readonly rend: GalongRenderer
	constructor(div: HTMLCanvasElement){
		this.di = div
		this.rend = new GalongRenderer(this.di)
	}
	resize(){
		this.rend.resize()
	}
	bang(){
		this.rend.init()
	}
}
