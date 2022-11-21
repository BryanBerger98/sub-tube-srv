import express, { Application } from 'express';
import ControllersRouter from './controllers/router';
import IController from './controllers/types/controller.interface';

type AppConfig = {
	port?: number;
	controllers: IController[];
}

const DEFAULT_PORT = 3000;

class App {

    readonly app: Application;
    readonly port: number;

    constructor({ port, controllers }: AppConfig) {
        this.app = express();
        this.port = port ?? DEFAULT_PORT;

        const controllersRouter = new ControllersRouter(this.app, controllers);
        this.app.use(controllersRouter.router);
    }

    public start(startMessage?: string): void {
        this.app.listen(this.port, () => {
            console.log(startMessage ?? `App listening on port ${ this.port }`);
        });
    }

}

export default App;