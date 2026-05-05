export interface parsedToken {
	value?: Array<AssignmentExpression>;
	type: string;
	identifier?: string;
	execute?: any;
	argument?: Array<string>;
	parent?: string;
	method?: string;
}

interface AssignmentExpression {
	key: string;
	value?: any;
	type:string;
}

interface FunctionDeclaration {
	argument: Array<string>;
	identifier: string;
	execute: any;
}
