import { Routes } from "./routes.type";

export default interface IController {
	path: string;
	routes: Routes;
}