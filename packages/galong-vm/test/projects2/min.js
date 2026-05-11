import { Sprite } from "../../../galong-render/src/sprite.ts";

class Cube extends Sprite {
	on_start(){
		this.rotatePerSecond(5,0,0)
	}
}
