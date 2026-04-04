export interface Define<State> {
	handlers<
		Data,
		Handlers extends RoutesHandlers<Data, State>
	>(handlers: Handlers): typeof handlers;
}
