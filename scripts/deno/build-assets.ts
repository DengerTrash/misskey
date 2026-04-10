/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';
import { buildTarball } from './tarball.mjs';
import process from "node:process";

const configDir = fileURLToPath(new URL('../../.config', import.meta.url));
const configPath = process.env.MISSKEY_CONFIG_YML
	? path.resolve(configDir, process.env.MISSKEY_CONFIG_YML)
	: process.env.NODE_ENV === 'test'
		? path.resolve(configDir, 'test.yml')
		: path.resolve(configDir, 'default.yml');

async function loadConfig() {
	const result = await fs.readFile(configPath, 'utf-8').then(
		data => yaml.load(data)
	).catch(() => null);
	return result
}

async function copyFrontendFonts() {
	await fs.cp(
		'./../../packages/frontend/node_modules/three/examples/fonts',
		'./built/_frontend_dist_/fonts', {
			dereference: true,
			recursive: true
		}
	);
}

export async function buildAssets() {
	await Promise.all([
		copyFrontendFonts(),
		loadConfig().then(config => (config as any)?.publishTarballInsteadOfProvideRepositoryUrl && buildTarball()),
	]);
}
