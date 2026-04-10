/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

//import cluster from 'node:cluster';
import process from "node:process";
import { envOption } from '@/env.ts';
import { loadConfig } from '@/config.ts';
import { jobQueue, server } from './common.ts';

/**
 * Init worker process
 */
export async function workerMain() {
	const config = loadConfig();

	if (config.sentryForBackend) {
		const Sentry = await import('@sentry/node');
		const { nodeProfilingIntegration } = await import('@sentry/profiling-node');

		Sentry.init({
			integrations: [
				...(config.sentryForBackend.enableNodeProfiling ? [nodeProfilingIntegration()] : []),
			],

			// Performance Monitoring
			tracesSampleRate: 1.0, //  Capture 100% of the transactions

			// Set sampling rate for profiling - this is relative to tracesSampleRate
			profilesSampleRate: 1.0,

			maxBreadcrumbs: 0,

			...config.sentryForBackend.options,
		});
	}

	await server()
	if (envOption.onlyServer) {
		await server();
	} else if (envOption.onlyQueue) {
		await jobQueue();
	} else {
		await jobQueue();
	}

	if (true){ //cluster.isWorker) {
		// Send a 'ready' message to parent process
		//process.send!('ready');
	}
}
