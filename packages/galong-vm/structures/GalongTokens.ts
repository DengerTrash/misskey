export type GalongToken =
| EmptyGalongToken
| DefineGalongToken
| FunctionGalongToken
| ForeverGalongToken
| ExpressionGalongToken
| AssignmentExpressionGalongToken
| CallExpressionGalongToken

interface BaseGalongToken {
	type: string
}

interface EmptyGalongToken {
	type: 'Empty'
}

interface DefineGalongToken extends BaseGalongToken {
	type: 'Define',
	identifier: string;
	value: Array<ExpressionGalongToken>;
}

interface FunctionGalongToken extends BaseGalongToken {
	type: 'Function',
	identifier: string;
	arguments: Array<unknown>;
	execute: Array<GalongToken>;
}

interface ForeverGalongToken extends BaseGalongToken {
	type: 'Forever',
	execute: Array<GalongToken>;
}
// Exoressions

interface ExpressionGalongToken extends BaseGalongToken {
	type: "Expression",
	value: AssignmentExpressionGalongToken
}


interface AssignmentExpressionGalongToken extends BaseGalongToken {
	type: "AssignmentExpression",
	value: Array<string>;
}

// member

interface CallExpressionGalongToken extends BaseGalongToken {
	type: "CallExpression",
	arguments: Array<unknown>;
	execute: Array<GalongToken>;
}
