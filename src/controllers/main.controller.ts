import { Request, Response } from "express";
import IController from "./types/controller.interface";
import { Routes } from "./types/routes.type";

class MainController implements IController {

	public path = '/';

	public routes: Routes = [
		{
			path: '/',
			method: 'GET',
			handler: this.handleHomePage.bind(this)
		}
	];

	handleHomePage(req: Request, res: Response) {
		res.send('Home page');
	}

}

export default MainController;