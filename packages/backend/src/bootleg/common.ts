/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import process, { config } from 'node:process';
//import { NestFactory } from '@nestjs/core';
import {Hono} from "$hono";
import { ChartManagementService } from '@/core/chart/ChartManagementService.ts';
import { QueueProcessorService } from '@/queue/QueueProcessorService.ts';
import { NestLogger } from '@/NestLogger.ts';
import { QueueProcessorModule } from '@/queue/QueueProcessorModule.ts';
import { QueueStatsService } from '@/daemons/QueueStatsService.ts';
import { ServerStatsService } from '@/daemons/ServerStatsService.ts';
import { ServerService } from '@/server/ServerService.ts';
import { MainModule } from '@/MainModule.ts';
import { DependencyOpts } from "bullmq";

function handler(request: Request): Response{
	return new Response('unko')
};


export async function server() {
	const app = await new Hono({

	});

	const serverService = app
	//await serverService.launch();

	if (process.env.NODE_ENV !== 'test') {
		//app.get(ChartManagementService).start();
		//app.get(QueueStatsService).start();
		//app.get(ServerStatsService).start();
	}
	Deno.serve(handler)
}

export async function jobQueue() {
	const jobQueue = await new Hono();
	return jobQueue;
}
