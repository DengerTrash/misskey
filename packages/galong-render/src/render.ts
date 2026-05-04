import babylon from 'npm:babylonjs'
export class GalongRenderer {
	private baby: babylon.Engine
	private canvas: HTMLCanvasElement
	constructor(canvas: HTMLCanvasElement){
		this.canvas = canvas
		this.baby = new babylon.Engine(canvas)
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

    /**
     * 物体の初期化。今回はただの立方体
     */
    const box = babylon.MeshBuilder.CreateBox( "box", {}, scene );

    return scene;
  }

  const scene = buildScene();

  /**
   * エンジンを動かして、カメラ、ライト、メッシュの入ったシーンをレンダリングする
   */
  this.baby.runRenderLoop( () =>
  {
    scene.render();
  });
	}
}
