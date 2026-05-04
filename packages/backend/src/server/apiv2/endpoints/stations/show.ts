//import { Station } from "../../../../models/_.js";
import { Endpoint } from "../../v2.ts";

export default Endpoint({
	path: 'api/stations/show',
	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Stations',
	},
	errors: {
		noSuchFile: {
			message: 'No such stations',
			code: 'NO_SUCH_STATIONS',
			id: '0513b1fb-e5b3-4caa-b73f-4f2322150237',
		}
	},
	params: {
		type: 'object',
		properties: {
			stationId: { type: 'string', format: 'misskey:id' },
		},
		required: ['stationId'],
	},
	async POST(ctx){
		const bod = await ctx?.req.json()
		await this.core?.supabase?.from('stations').select('*').eq('id',1)
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
