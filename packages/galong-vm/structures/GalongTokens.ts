export type GalongToken =
| DefineGalongToken
| FunctionGalongToken


interface BaseGalongToken {
	type: string
}

interface DefineGalongToken extends BaseGalongToken {
	type: 'Define'
}
interface FunctionGalongToken extends BaseGalongToken {
	type: 'Function',
	argument: Array<unknown>;
	execute: Array<GalongToken>;
}
