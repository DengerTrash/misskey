/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { MedilandHandlers, MedilandRequest } from '../../../../../../backend-mediland/src/mod.js';

export const meta = {
	tags: ['stations'],

	requireCredential: false,

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Station',
	},

	errors: {
		noSuchStation: {
			message: 'No such station.',
			code: 'NO_SUCH_STATION',
			id: '9ae667b3-0e91-46ba-b90e-4727f83eb373',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		stationId: {
			type: 'string',
			format: 'misskey:id',
		},
	},
	required: ['stationId'],
} as const;

export const handler: MedilandHandlers = {
	tag: ['stations'],
	async GET(request: MedilandRequest) {
		console.log('unko');
	},
};
