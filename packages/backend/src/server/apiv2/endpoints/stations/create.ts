import { Endpoint } from "../../v2.ts";

export default Endpoint({
	path: 'api/stations/create',
	execute(req){
		console.log(req?.req.raw)
		return req?.req.raw
	}
})
