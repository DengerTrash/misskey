/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { execa, execaNode } from 'execa';
import process from "node:process";
import { buildAssets } from '../../../../scripts/deno/build-assets.ts'

/** @type {import('execa').ExecaChildProcess | undefined} */
let backendProcess: Deno.Command | undefined;

async function execBuildAssets() {
	await execa('pnpm', ['run', 'build-assets'], {
		cwd: '../../',
		stdout: process.stdout,
		stderr: process.stderr,
	})
}

async function execStart() {
	// pnpm run start を呼び出したいが、windowsだとプロセスグループ単位でのkillが出来ずゾンビプロセス化するので
	// 上記と同等の動きをするコマンドで子・孫プロセスを作らないようにしたい
	backendProcess = new Deno.Command(Deno.execPath(),{
		args: ['run', '-A', '--sloppy-imports', '--watch', './src/bootleg/entry.ts'],
		stdout: 'piped',
		stderr: 'piped',
		env: {
			'NODE_ENV': 'development',
		},
	});
	const backendStd = await backendProcess.spawn();

	console.log(backendStd.stdout)
	console.error(backendStd.stderr)

}

async function killProc() {
	if (backendProcess) {
		backendProcess.catch(() => {}); // backendProcess.kill()によって発生する例外を無視するためにcatch()を呼び出す
		backendProcess.kill();
		await new Promise(resolve => backendProcess.on('exit', resolve));
		backendProcess = undefined;
	}
};

(async() => {
	await buildAssets()
	await execStart()
})

/*
(async () => {
	execaNode(
		'./node_modules/nodemon/bin/nodemon.js',
		[
			'-w', 'src',
			'-e', 'ts,js,mjs,cjs,tsx,json,pug',
			'--exec', 'pnpm', 'run', 'build',
		],
		{
			stdio: [process.stdin, process.stdout, process.stderr, 'ipc'],
			serialization: "json",
		})
		.on('message', async (message) => {
			if (message.type === 'exit') {
				// かならずbuild->build-assetsの順番で呼び出したいので、
				// 少々トリッキーだがnodemonからのexitイベントを利用してbuild-assets->startを行う。
				// pnpm restartをbuildが終わる前にbuild-assetsが動いてしまうので、バラバラに呼び出す必要がある

				await killProc();
				await buildAssets();
				await execStart();
			}
		})
})();
*/
