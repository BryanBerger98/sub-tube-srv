import { RequestHandler } from 'express';

type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Route = {
	path: string;
	method: RouteMethod;
	middlewares?: RequestHandler[];
	handler: RequestHandler;
}

type Routes = Route[];

export { RouteMethod, Route, Routes };