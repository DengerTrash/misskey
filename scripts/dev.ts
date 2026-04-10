/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import clean from "./deno/clean.ts";
import { build as preBuild } from "./deno/build-pre.ts";
import { buildAssets } from "./deno/build-assets.ts";
import { execa } from "execa";
import process from "node:process";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

await clean();

await preBuild();

await buildAssets();

// Denoの場合、バックエンドのビルドは不要です


const backend = new Deno.Command(Deno.execPath(),{
	args: ['task', 'dev'],
	cwd: "./packages/backend"
});
const backendStd = await backend.output();
console.log(backendStd?.stdout)
console.error(backendStd?.stderr)

/**
	execa('pnpm', ['--filter', 'backend...', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),

*/

await Promise.all([
	//execa('pnpm', ['build-pre'], {
	//	cwd: _dirname + '/../',
	//	stdout: process.stdout,
	//	stderr: process.stderr,
	//}),
	//execa('pnpm', ['build-assets'], {
	//	cwd: _dirname + '/../',
	//	stdout: process.stdout,
	//	stderr: process.stderr,
	//}),
	execa('pnpm', ['--filter', 'backend...', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
	// icons-subsetterは開発段階では使用されないが、型エラーを抑制するためにはじめの一度だけビルドする
	execa('pnpm', ['--filter', 'icons-subsetter', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
	execa('pnpm', ['--filter', 'misskey-js', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
]);

execa('pnpm', ['build-pre', '--watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['build-assets', '--watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'backend', 'dev'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'frontend-shared', 'watch', '--no-clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'frontend', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'frontend-embed', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'sw', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'misskey-js', 'watch', '--no-clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'i18n', 'watch', '--no-clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'misskey-reversi', 'watch', '--no-clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('pnpm', ['--filter', 'misskey-bubble-game', 'watch', '--no-clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});
