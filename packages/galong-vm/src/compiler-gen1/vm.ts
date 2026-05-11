import { GalongFunction } from "../../structures/Function.ts";
import { GalongToken } from "../../structures/GalongTokens.ts";
import { parsedToken } from "../../structures/parsedToken.ts";
import { GalongSprite } from "../../structures/sprite.ts";
import { GalongPlayer } from "../mod.ts";
import { parser } from "./parser.ts";
import * as fs from "node:fs";

export class GalongVM {
	// 次のフレームで再開すべきタスク（Promiseのresolve関数）のリスト
  private nextFrameTasks: (() => void)[] = [];
  public isRunning: boolean = true;

	public sprites: Map<string,GalongSprite>
	public functions: Map<string,GalongFunction>
	readonly parents: GalongPlayer;
	constructor(parents: GalongPlayer){
		this.parents = parents
		this.sprites = new Map()
		this.functions = new Map()
	}
  /**
   * スクリプト内で呼び出す「フレーム同期待ち」関数。
   * これを await することで、ロジックの実行が一旦止まり、
   * 次の tick() が呼ばれるまでブラウザに制御を返します。
   */
  yield(): Promise<void> {
    return new Promise((resolve) => {
      this.nextFrameTasks.push(resolve);
    });
  }

  /**
   * メインループ（Babylon.jsのレンダリングループから毎フレーム呼ばれる）
   * 待機中のタスクを一斉に再開させます。
   */
  tick() {
    if (!this.isRunning) return;

    // 現在待機しているタスクをすべて取り出し、リストを空にする
    const tasksToRun = this.nextFrameTasks;
    this.nextFrameTasks = [];

    // タスクのロックを解除（＝await の先へ進ませる）
    for (const resolve of tasksToRun) {
      resolve();
    }
  }

	executeCompiler(code: string){
		/**
		const aaa = function(parents: GalongPlayer) {

			parents.vm.sprites.set("Cube",new GalongSprite(
				parents,
				parents.rend.scenes[0],
				crypto.randomUUID()
			))
		}
		aaa(this.parents)
		console.log(this.sprites)
		*/
		const cocco = new Function("parents","assets", code)
		try {
			cocco(this.parents,{
				GalongSprite
			})
		} catch(e){
			console.error(e)
		}
	}
  /**
   * 命令（JSON）を実行するインタプリタ
   */
  async execute(instructions: Array<GalongToken>,sprites?: GalongSprite, functionArguments?: Map<string,unknown>): Promise<void> {
    if (!this.isRunning) return;
		for(const instruction of instructions){
			console.log(instruction)
			console.log('execute,', functionArguments)
			await this.state(instruction,{
				sprites,functionArguments
			})
				/**

				case 'ROTATE':
					sprite.rotate(instruction.args[0], instruction.args[1], instruction.args[2]);
					break;

					case 'IF':
						// 条件がtrueならbodyを実行
						if (this.evaluateCondition(instruction.condition, sprite)) {
							for (const subInst of instruction.body) {
								await this.execute(subInst, sprite);
							}
						}
						break;

						case 'FOREVER':
							// 無限ループ。必ず内部で yield を呼ぶことでフリーズを防ぐ
							while (this.isRunning) {
								for (const subInst of instruction.body) {
									await this.execute(subInst, sprite);
								}
								await this.yield(); // <- 【超重要】ここで1フレーム待機！
							}
							break;

							default:
								console.warn(`Unknown operation: ${instruction.op}`);
								*/

			}
		}
	async state(instruction: GalongToken, options?: {
		sprites?: GalongSprite,
		functionArguments?: Map<string,unknown>
	}){
		console.log(options?.functionArguments)
		switch (instruction.type) {
			case "Define": {
				const spriteInstance = new GalongSprite(
					this.parents,
					this.parents.rend.scenes[0],
					crypto.randomUUID()
				);

				for(const va of instruction.value!){
					const { value } = va;
					if(value.key === 'on_start'){
						const valueValue = value.value.filter((va: any) => typeof va === 'string')
						spriteInstance.on_start = valueValue
					}
				}
				this.sprites.push(spriteInstance)
				break;
			}
			case "Empty": {
				break;
			}
			case "Expression": {
				//console.log('functionArgs',functionArguments)
				/**

				if(instruction.value?.execute.parent === 'sprite'){
					switch (instruction.value?.execute.method){
						case 'rotatePerSecond': {
							const par = instruction.value?.arguments
							this.sprites[0]?.rotatePerSecond(
								par[0],
								par[1],
								par[2]
							)
						}
						break;
					}
				}
				*/
				break;
			}
			//Ex何ちゃらを動かす動作も追加しなければだけど。。。。秋田。
			case "Forever": {
				console.log('forever')
				while (this.isRunning) {
          for (const subInst of instruction.execute) {
            await this.state(subInst);
          }
          await this.yield(); // <- 【超重要】ここで1フレーム待機！
        }
        break;
			}
			case "Function": {
				console.log(instruction.execute)
				const FunctionInstance = new GalongFunction(
					this,instruction.identifier!,
					instruction.arguments ?? [],
					instruction.execute.execute
				);
				this.functions.set(instruction.identifier ?? 'unknown_function',FunctionInstance)
				break;
			}
		}
	}
	async bang(){
		console.log('bang')
		for await(const sprite of this.sprites){
			if(sprite.on_start){
				console.log('onstart')
				for await(const func of sprite.on_start){
					console.log(this.functions)
					// on_startの関数の第一引数は必ずSpriteになるぜ
					const exec = this.functions.get(func)?.execute(sprite,sprite)
				}
			}
		}
		this.loop()
	}
	loop(){
		this.tick(); // ここで全員の yield のロックが外れ、1歩進む

		const cube1 = this.sprites[0]
  	// 状態の確認（テスト出力）
 		//console.log(`Frame update -> Cube1: ${cube1.mesh.rotation.x},${cube1.mesh.rotation.y},${cube1.mesh.rotation.z}`);

  	// 疑似的な60fpsループ (実際は requestAnimationFrame を使う)
  	if (cube1.rotation.y < 5) {
  	  setTimeout(this.loop.bind(this), 1000 / 60);
	  } else {
  	  console.log("テスト終了");
  	  this.isRunning = false;
 	 }
	}
}
