import { GalongFunction } from "../structures/Function.ts";
import { parsedToken } from "../structures/parsedToken.ts";
import { GalongSprite } from "../structures/sprite.ts";
import { GalongPlayer } from "./mod.ts";
import { parser } from "./parser.ts";
import * as fs from "node:fs";

export class GalongVM {
	// 次のフレームで再開すべきタスク（Promiseのresolve関数）のリスト
  private nextFrameTasks: (() => void)[] = [];
  public isRunning: boolean = true;

	public sprites: Array<GalongSprite>
	public functions: Map<string,GalongFunction>
	readonly parents: GalongPlayer;
	constructor(parents: GalongPlayer){
		this.parents = parents
		this.sprites = []
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

  /**
   * 命令（JSON）を実行するインタプリタ
   */
  async execute(instructions: Array<parsedToken>, sprite?: GalongSprite): Promise<void> {
    if (!this.isRunning) return;
		for(const instruction of instructions){
			console.log(instruction)
			await this.state(instruction)
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
	async state(instruction: parsedToken){
		switch (instruction.type) {
			case "DefineStatement": {
				const spriteInstance = new GalongSprite(this.parents,crypto.randomUUID())
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
			case "EmptyStatement": {
				break;
			}
			//Ex何ちゃらを動かす動作も追加しなければだけど。。。。秋田。
			case "ForeverStatement": {
				while (this.isRunning) {
          for (const subInst of instruction.execute) {
            await this.state(subInst);
          }
          await this.yield(); // <- 【超重要】ここで1フレーム待機！
        }
        break;
			}
			case "FunctionDeclaration": {
				console.log(instruction.execute)
				const FunctionInstance = new GalongFunction(this,instruction.identifier!,instruction.argument ?? [],instruction.execute.execute)
				this.functions.set(instruction.identifier ?? 'unknown_function',FunctionInstance)
				break;
			}
		}
	}
	async bang(){
		for await(const sprite of this.sprites){
			if(sprite.on_start){
				for await(const func of sprite.on_start){
					const exec = this.functions.get(func)?.execute(sprite,this)
				}
			}
		}
	}
}
