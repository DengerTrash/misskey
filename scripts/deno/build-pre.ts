/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fs from 'node:fs';
import process from "node:process";

const __dirname = import.meta.dirname;

const packageJsonPath = __dirname + '/../../package.json'
console.log(packageJsonPath)
export function build() {
	try {
		const json = fs.readFileSync(__dirname + '/../../deno.json', 'utf-8')
		const meta = JSON.parse(json);
		fs.mkdirSync(__dirname + '/../../built', { recursive: true });
		fs.writeFileSync(__dirname + '/../../built/meta.json', JSON.stringify({ version: meta.version }), 'utf-8');
	} catch (e) {
		console.error(e)
	}
}


if (process.argv.includes("--watch")) {
	fs.watch(packageJsonPath, (_event, filename) => {
		console.log(`update ${filename} ...`)
		build()
	})
}
