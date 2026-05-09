import { Sprite } from "../../galong-render/src/sprite.ts";
import { GalongPlayer } from "../src/gen2/player.ts";
import babylon from 'npm:babylonjs'
export class GalongSprite {
	readonly parent: GalongPlayer;
	readonly id: string;
	public scene: babylon.Scene
	public on_start: Array<string>;
	public x: Float32Array
	public y: Float32Array
	public z: Float32Array
	readonly mesh: babylon.Mesh
	public rotation: {x: number,y: number,z: number}
	constructor(parent: GalongPlayer,scene: babylon.Scene, id: string){
		this.parent = parent;
		this.id = id;
		this.x = new Float32Array(32);
		this.y = new Float32Array(32);
		this.z = new Float32Array(32);
		this.rotation = {x: 0, y: 0, z: 0}

		this.on_start = []

		this.scene = scene

		this.mesh = babylon.MeshBuilder.CreateBox( "box", {}, scene );
	}
	pointInDirection(x: number, y:number, z: number){
		this.mesh.rotation = new babylon.Vector3(x, y, z)
	}
	/**
	 * 1秒あたりで回す角度を決定します
	 * @param x
	 * @param y
	 * @param z
	 */
	rotatePerSecond(x: number, y: number, z: number) {
		const deltaTime = this.parent.rend.baby.getDeltaTime() / 1000;
		 const rotationQuaternion = babylon.Quaternion.RotationYawPitchRoll(
			babylon.Tools.ToRadians(x) * deltaTime,
			babylon.Tools.ToRadians(y) * deltaTime,
			babylon.Tools.ToRadians(z) * deltaTime
		)
		if(!this.mesh.rotationQuaternion) this.mesh.rotationQuaternion = babylon.Quaternion.FromEulerVector(this.mesh.rotation);
		this.mesh.rotationQuaternion?.multiplyInPlace(rotationQuaternion);
  }
}
