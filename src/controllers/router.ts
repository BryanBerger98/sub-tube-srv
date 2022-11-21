import { Application, RequestHandler, Router } from "express";
import IController from "./types/controller.interface";
import { Route, RouteMethod } from "./types/routes.type";

class ControllersRouter {

	router = Router();

	constructor(app: Application, controllers: IController[]){

		for (const controller of controllers) {
			const routes = controller.routes.map(route => this.addRouteToStack(route));
			app.use(controller.path, ...routes);
		}

	}

	private getRouterMethod = (method: RouteMethod) => (path: string, ...handlers: RequestHandler[]) => {
		switch (method) {
			case 'GET':
				return this.router.get(path, ...handlers);
			case 'POST':
				return this.router.post(path, ...handlers);
			case 'PUT':
				return this.router.put(path, ...handlers);
			case 'PATCH':
				return this.router.patch(path, ...handlers);
			case 'DELETE':
				return this.router.delete(path, ...handlers);
			default:
				return this.router.get(path, ...handlers);
		}
	}

	addRouteToStack(route: Route): Router {
		const handlers = route.middlewares ? [...route.middlewares, route.handler] : [route.handler];
		return this.getRouterMethod(route.method)(route.path, ...handlers);
	}

}

export default ControllersRouter;