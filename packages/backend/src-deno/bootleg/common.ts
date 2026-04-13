/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {Hono} from "$hono";
import { Mediland } from "../mediland/BaseClass.ts";

function handler(request: Request): Response{
	return new Response('unko')
};


export async function server() {
	const app = new Mediland({
		url: 'unko',
		port: 8080
	})

	const serverService = app
	//await serverService.launch();

	if (process.env.NODE_ENV !== 'test') {
		//app.get(ChartManagementService).start();
		//app.get(QueueStatsService).start();
		//app.get(ServerStatsService).start();
	}
	app.fire();
}

export async function jobQueue() {
	const jobQueue = await new Hono();
	return jobQueue;
}
