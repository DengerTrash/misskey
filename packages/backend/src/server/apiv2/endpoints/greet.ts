import { Endpoint } from "../v2.ts";

export default Endpoint({
	path: '/apiv2/greet',
	execute(req){
		return 'unko'
	}
})
