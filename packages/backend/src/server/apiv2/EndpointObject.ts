import { type Context, Hono } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

import type { KeyOf, Schema } from '@/misc/json-schema.ts';
import { SupabaseClient } from "@supabase/supabase-js";
import { HonoOptions } from "../../../../../$node_modules/.pnpm/hono@4.12.14/$node_modules/hono/dist/types/hono-base.js";
//import { Inject } from "@nestjs/common";
//import { DI } from "../../di-symbols.ts";

//import { StationsRepository } from '@/models/_.ts'
//import { IdService } from '@/core/IdService.ts'


export interface EndpointObject {
	path: string;
	execute?(req?: Context<{}, "/", BlankInput>): unknown;
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

	readonly params?: Schema;

	core?: Honoland;

	get?(req?: Context<{}, "/", BlankInput>): unknown;
	POST?(ctx?: Context<{}, "/", BlankInput>): unknown;
}


export class Honoland extends Hono {
	public supabase?: SupabaseClient
	constructor(options?: HonoOptions<BlankEnv> | undefined){
		super(options);
	}
}
