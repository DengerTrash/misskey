import { Hono } from "hono";
import * as greet from './endpoints/greet.ts'
export const Honoland = new Hono();
Honoland.get()

interface EndpointObject {
	path: string;
	execute(): Promise<Hono>
}
export function Endpoint(list: EndpointObject){

}
