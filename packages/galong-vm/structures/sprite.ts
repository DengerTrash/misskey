import { Sprite } from "../../galong-render/src/sprite.ts";
import { GalongPlayer } from "../src/old/player.ts";
import babylon from 'npm:babylonjs'
export class GalongSprite {
	readonly parent: GalongPlayer;
	readonly id: string;
	public on_start: Array<string>;
	public x: Float32Array
	public y: Float32Array
	public z: Float32Array
	readonly mesh: babylon.Mesh
	public rotation: {x: number,y: number,z: number}
	constructor(parent: GalongPlayer,id: string){
		this.parent = parent;
		this.id = id;
		this.x = new Float32Array(32);
		this.y = new Float32Array(32);
		this.z = new Float32Array(32);
		this.rotation = {x: 0, y: 0, z: 0}

		this.on_start = []

		this.mesh = babylon.MeshBuilder.CreateBox( "box", {}, parent.rend.scenes[0] );
	}
	rotatePerSecond(x: number, y: number, z: number) {
		this.mesh.rotate(new babylon.Vector3(x,y,z),1)
    // console.log(`[${this.id}] rotated to Y:${this.rotation.y}`);
  }
}
