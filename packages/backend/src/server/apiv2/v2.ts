import { type Context, Hono } from "hono";
import type { BlankInput, Schema } from 'hono/types'

import * as endpoints from './mod.ts';

export default function initHonoland(){
	const Honoland = new Hono();

	/**下のディレクトリを全部調べるぞおじさん「下のディレクトリを全部調べるぞ」 */
	for (const [name, module] of Object.entries(endpoints)) {
        const def = module as EndpointObject;
        if (def?.path) {
            Honoland.get(def.path, (c) => {
                const result = def.execute(c);
                if (typeof result === 'object') {
                    return c.json(result);
                }
                return c.text('something error!');
            });
        }
    }
	return Honoland;
}
export interface EndpointObject {
	path: string;
	execute?(req?: Context<{}, "/", BlankInput>): unknown
	readonly stability?: 'deprecated' | 'experimental' | 'stable';

	readonly tags?: ReadonlyArray<string>;


	readonly errors?: {
		readonly [key: string]: {
			readonly message: string;
			readonly code: string;
			readonly id: string;
		};
	};

	/**
	 * 引っ越し済みのユーザーによるリクエストを禁止するか
	 * 省略した場合は false として解釈されます。
	 */
	readonly prohibitMoved?: boolean;

	/**
	 * エンドポイントのリミテーションに関するやつ
	 * 省略した場合はリミテーションは無いものとして解釈されます。
	 */
	readonly limit?: {

		/**
		 * 複数のエンドポイントでリミットを共有したい場合に指定するキー
		 */
		readonly key?: string;

		/**
		 * リミットを適用する期間(ms)
		 * このプロパティを設定する場合、max プロパティも設定する必要があります。
		 */
		readonly duration?: number;

		/**
		 * durationで指定した期間内にいくつまでリクエストできるのか
		 * このプロパティを設定する場合、duration プロパティも設定する必要があります。
		 */
		readonly max?: number;

		/**
		 * 最低でもどれくらいの間隔を開けてリクエストしなければならないか(ms)
		 */
		readonly minInterval?: number;
	};
	readonly res?: Schema;

	get?(req?: Context<{}, "/", BlankInput>): unknown

}
export function Endpoint(list: EndpointObject){
	return list;
}

// TODO: execute→GET,POST,PATCH,DELETE
