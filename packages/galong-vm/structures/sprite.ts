import { GalongPlayer } from "../src/player.ts";
import babylon from 'npm:babylonjs'
export class GalongSprite {
	readonly parent: GalongPlayer;
	readonly jittai: babylon.Mesh;
	readonly id: string;
	public on_start: Array<string>;
	public x: Float32Array
	public y: Float32Array
	public z: Float32Array
	public rotation: {x: number,y: number,z: number}
	constructor(parent: GalongPlayer,id: string){
		this.parent = parent;
		this.id = id;
		this.x = new Float32Array(32);
		this.y = new Float32Array(32);
		this.z = new Float32Array(32);
		this.rotation = {x: 0, y: 0, z: 0}

		this.on_start = []

		this.jittai = this.parent.rend.createSprites(this)
	}
	rotate(x: number, y: number, z: number) {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
		this.jittai.rotate(
			new babylon.Vector3(x,y,z),
			2 * this.jittai.getScene().getAnimationRatio()
		)
    // console.log(`[${this.id}] rotated to Y:${this.rotation.y}`);
  }
}
