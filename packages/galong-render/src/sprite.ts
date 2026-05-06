import babylon from 'npm:babylonjs'
import { GalongRenderer } from "./mod.ts";
export class Sprite {
	public mesh: babylon.Mesh
	public parent: GalongRenderer
	constructor(parent: GalongRenderer){
		this.parent = parent
		this.mesh = babylon.MeshBuilder.CreateBox( "box", {}, parent.scenes[0] );
	}
	rotatePerSecond(x: number, y: number, z: number){
		console.log(x,y,z)
		this.mesh.rotation.x = Number(this.mesh.rotation.x) + x;
		this.mesh.rotation.y = this.mesh.rotation.y + y;
		this.mesh.rotation.z = this.mesh.rotation.z + z;
	}
}
