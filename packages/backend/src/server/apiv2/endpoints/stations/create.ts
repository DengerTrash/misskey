import { Endpoint } from "../../v2.ts";

export default Endpoint({
	path: 'api/stations/create',
	errors: {
		noSuchFile: {
			message: 'No such file',
			code: 'NO_SUCH_FILE',
			id: '7a846e25-c0ba-4bf6-a553-2c76c5ebc36e',
		}
	},
	execute(req){
		console.log(req?.req.raw)
		return req?.req.raw
	}
})
