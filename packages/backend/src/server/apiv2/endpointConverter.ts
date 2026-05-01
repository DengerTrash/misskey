import { IEndpoint } from "../api/endpoints.ts";
import type { EndpointObject } from "./EndpointObject.ts";

export default function endpointConverter(name: string,data: EndpointObject): IEndpoint{
	return {
		name,
		meta: {
			tags: data?.tags,
			limit: data?.limit,
			errors: data?.errors
		},
		params: data?.params
	}
}
