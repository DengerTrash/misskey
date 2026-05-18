export type GalongToken =
| EmptyGalongToken
| DefineGalongToken
| FunctionGalongToken
| ForeverGalongToken
| ExpressionGalongToken
| AssignmentExpressionGalongToken
| CallExpressionGalongToken
| MemberExpressionPropRefExpGalongToekn

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
	arguments: Array<string>;
	execute: FunctionBody
}

interface FunctionBody extends BaseGalongToken{
	type: 'FunctionBody',
	execute: Array<GalongToken>;
}

interface ForeverGalongToken extends BaseGalongToken {
	type: 'Forever',
	execute: Array<GalongToken>;
}
// Exoressions

export interface ExpressionGalongToken extends BaseGalongToken {
	type: "Expression",
	value: AssignmentExpressionGalongToken | CallExpressionGalongToken
}


interface AssignmentExpressionGalongToken extends BaseGalongToken {
	type: "AssignmentExpression",
	key: string;
	value: Array<string>;
}

// member

export interface CallExpressionGalongToken extends BaseGalongToken {
	type: "CallExpression",
	arguments: Array<unknown>;
	execute: MemberExpressionPropRefExpGalongToekn;
}

export interface MemberExpressionPropRefExpGalongToekn extends BaseGalongToken {
	type: "MemberExpression_propRefExp";
  parent: string;
  method?: string;
}
