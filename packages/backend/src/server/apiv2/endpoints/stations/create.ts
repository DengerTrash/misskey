//import { Station } from "../../../../models/_.js";
import { Endpoint } from "../../v2.ts";

export default Endpoint({
	path: 'api/stations/create',
	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Stations',
	},
	errors: {
		noSuchFile: {
			message: 'No such file',
			code: 'NO_SUCH_FILE',
			id: '7a846e25-c0ba-4bf6-a553-2c76c5ebc36e',
		}
	},
	params: {
		type: 'object',
		properties: {
			name: { type: 'string', minLength: 1, maxLength: 128 },
			description: { type: 'string', nullable: true, maxLength: 2048 },
			coordinators: {
				type: 'array',
				items: { type: 'string', format: 'misskey:id' },
				nullable: true,
			},
		},
		required: ['name'],
	},
	async execute(req){
		const me = req?.req.param;
		/**

		const channel = await this.core?.stationsRepository?.insertOne({
			id: this.core?.idService?.gen(),
			userId: me?.id,
			name: me?.name,
		} as Station);
		return await this.core?.stationsRepository?.pack(channel, me);
		*/
	}
})
