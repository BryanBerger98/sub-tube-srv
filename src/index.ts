import App from './app';
import { AuthController, MainController, SubscriptionsController } from './controllers';
import config from './environment/env.config';
import GoogleApiService from './services/google-api.service';

const googleApiService = new GoogleApiService();

const app = new App({
    port: config.PORT,
    controllers: [
        new MainController(),
        new AuthController(googleApiService),
        new SubscriptionsController(googleApiService),
    ],
});

app.start();