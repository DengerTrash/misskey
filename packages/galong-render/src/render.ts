import babylon from 'npm:babylonjs'
import { GalongPlayer,GalongSprite } from '../../galong-vm/src/mod.ts'
export class GalongRenderer {
	readonly parents: GalongPlayer;
	public baby: babylon.Engine
	private canvas: HTMLCanvasElement
	scenes: Array<babylon.Scene>;
	constructor(parents: GalongPlayer, canvas: HTMLCanvasElement){
		this.parents = parents;
		this.canvas = canvas
		this.baby = new babylon.Engine(canvas)
		this.scenes = []
	}
	resize(){
		this.baby.resize()
	}
	init(){
			/**
   * カメラ、ライト、メッシュの入ったシーンを作成する
   */
  const buildScene = () => {
    /**
     * シーン自体の初期化。この中に物体を詰め込んでいく
     */
    const scene = new babylon.Scene(this.baby);

    /**
     * カメラの初期化
     */
    const camera = new babylon.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new babylon.Vector3(0, 0, 0), scene);

    camera.attachControl(this.canvas, true);

    /**
     * ライトの初期化
     */
    const light = new babylon.HemisphericLight("light", new babylon.Vector3(0, 1, 0), scene);


    return scene;
  }

  const scene = buildScene();
	this.scenes.push(scene)

  /**
   * エンジンを動かして、カメラ、ライト、メッシュの入ったシーンをレンダリングする
   */
  this.baby.runRenderLoop( () =>
  {
    scene.render();
  });
	}
	createSprites(sprite: GalongSprite){

    /**
     * 物体の初期化。今回はただの立方体
     */
    const box = babylon.MeshBuilder.CreateBox( "box", {}, this.scenes[0] );
		return box;
	}
}
